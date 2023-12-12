package com.example.back.service;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class CheckArea {
    public static boolean check(double x, double y, double r) {
        return inRectangle(x, y, r) || inTriangle(x, y, r) || inCircle(x, y, r);
    }

    private static boolean inRectangle(double x, double y, double r) {
       return x >= 0 && y >= 0 && Math.abs(x) <= r && Math.abs(y) <= r;
    }

    private static boolean inTriangle(double x, double y, double r) {
        double x1 = 0;
        double y1 = 0;
        double x2 = r / 2;
        double y2 = 0;
        double x3 = 0;
        double y3 = -r/2;

        double fullTriangleArea = Math.abs((x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2)) / 2.0);
        double subTriangle1Area = Math.abs((x * (y1 - y2) + x1 * (y2 - y) + x2 * (y - y1)) / 2.0);
        double subTriangle2Area = Math.abs((x * (y2 - y3) + x2 * (y3 - y) + x3 * (y - y2)) / 2.0);
        double subTriangle3Area = Math.abs((x * (y3 - y1) + x3 * (y1 - y) + x1 * (y - y3)) / 2.0);

        return x>=0 && y<=0 && (fullTriangleArea == subTriangle1Area + subTriangle2Area + subTriangle3Area);
    }

    private static boolean inCircle(double x, double y, double r) {
        return x <= 0 && y <= 0 && (Math.pow(x,2) + Math.pow(y,2)) <= Math.pow(r/2,2);
    }

    public boolean validate(double x , double y , double r){
            List<Double> arrayR = new ArrayList<>();
            for (double i = 1; i <= 3; i += 1) {
                arrayR.add(i);
            }
            if (arrayR.contains(r) && (x > -5) && (x < 3) && (y > -3) && (y < 3)) {
                return true;
            }
        return false;
    }
}
