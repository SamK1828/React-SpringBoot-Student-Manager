package com.studentmanager.student_management_backend.controller;

import com.studentmanager.student_management_backend.entity.Student;
import com.studentmanager.student_management_backend.service.StudentService;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/files")
@CrossOrigin(origins = "http://localhost:5173")
public class FileController {

    @Autowired
    private StudentService studentService;

    // Import .xls Excel file
    @PostMapping("/import")
    public ResponseEntity<String> importStudents(@RequestParam("file") MultipartFile file) {
        if (file == null || file.isEmpty()) {
            return ResponseEntity.badRequest().body("File is empty");
        }

        try (InputStream is = file.getInputStream();
             Workbook workbook = new HSSFWorkbook(is)) { // HSSFWorkbook for .xls

            Sheet sheet = workbook.getSheetAt(0);
            List<Student> students = new ArrayList<>();

            for (Row row : sheet) {
                if (row.getRowNum() == 0) continue; // skip header row

                String name = getCellString(row.getCell(0));
                String email = getCellString(row.getCell(1));
                String course = getCellString(row.getCell(2));
                Integer marks = getCellInteger(row.getCell(3));

                // Optional: skip if required fields missing
                if ((name == null || name.isBlank()) && (email == null || email.isBlank())) {
                    continue; // skip empty rows
                }

                Student s = new Student();
                s.setName(name);
                s.setEmail(email);
                s.setCourse(course);
                s.setMarks(marks);
                students.add(s);
            }

            if (!students.isEmpty()) {
                studentService.saveAll(students); // now available on service
            }

            return ResponseEntity.ok("Students imported successfully! Count: " + students.size());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Error importing file: " + e.getMessage());
        }
    }

    // Export .xls Excel file
    @GetMapping("/export")
    public ResponseEntity<byte[]> exportStudents() {
        try (Workbook workbook = new HSSFWorkbook()) {
            Sheet sheet = workbook.createSheet("Students");
            Row header = sheet.createRow(0);
            header.createCell(0).setCellValue("Name");
            header.createCell(1).setCellValue("Email");
            header.createCell(2).setCellValue("Course");
            header.createCell(3).setCellValue("Marks");

            List<Student> students = studentService.findAll();
            int rowIdx = 1;

            for (Student s : students) {
                Row row = sheet.createRow(rowIdx++);
                row.createCell(0).setCellValue(s.getName() != null ? s.getName() : "");
                row.createCell(1).setCellValue(s.getEmail() != null ? s.getEmail() : "");
                row.createCell(2).setCellValue(s.getCourse() != null ? s.getCourse() : "");
                if (s.getMarks() != null) {
                    row.createCell(3).setCellValue(s.getMarks());
                } else {
                    row.createCell(3).setCellValue("");
                }
            }

            ByteArrayOutputStream out = new ByteArrayOutputStream();
            workbook.write(out);

            HttpHeaders headers = new HttpHeaders();
            headers.add("Content-Disposition", "attachment; filename=students.xls");

            return ResponseEntity.ok()
                    .headers(headers)
                    .contentType(MediaType.APPLICATION_OCTET_STREAM)
                    .body(out.toByteArray());

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Helper: reads cell as String (handles different cell types)
    private String getCellString(Cell cell) {
        if (cell == null) return "";
        switch (cell.getCellType()) {
            case STRING:
                return cell.getStringCellValue().trim();
            case NUMERIC:
                // numeric -> convert to string without .0 if integer
                double d = cell.getNumericCellValue();
                if (d == Math.floor(d)) {
                    return String.valueOf((long) d);
                }
                return String.valueOf(d);
            case BOOLEAN:
                return String.valueOf(cell.getBooleanCellValue());
            case FORMULA:
                return cell.getCellFormula();
            case BLANK:
            case _NONE:
            case ERROR:
            default:
                return "";
        }
    }

    // Helper: read marks as Integer (handles numeric or string cells)
    private Integer getCellInteger(Cell cell) {
        if (cell == null) return null;
        try {
            switch (cell.getCellType()) {
                case NUMERIC:
                    double d = cell.getNumericCellValue();
                    return (int) Math.round(d);
                case STRING:
                    String s = cell.getStringCellValue().trim();
                    if (s.isEmpty()) return null;
                    return Integer.valueOf(s.split("\\.")[0].trim());
                case FORMULA:
                    try {
                        double val = cell.getNumericCellValue();
                        return (int) Math.round(val);
                    } catch (Exception ex) {
                        String sval = cell.getStringCellValue();
                        return sval.isEmpty() ? null : Integer.valueOf(sval);
                    }
                default:
                    return null;
            }
        } catch (Exception ex) {
            // If conversion fails, return null (or you may throw)
            return null;
        }
    }
}