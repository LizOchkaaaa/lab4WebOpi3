package model;
@RestController
public class AreaResult {
    public static boolean getResult(double x, double y, double r) {
        // check 1st square -- 1/4 circle
        if (x >= 0 && y >= 0) {
            if ((Math.pow(x, 2) + Math.pow(y, 2)) <= Math.pow(r, 2))
                return true;
        }
        // check 2nd square -- void
        if (x <= 0 && y >= 0) {
            return false;
        }
        // check 3rd square -- triangle
        if (x <= 0 && y <= 0) {
            if (Math.abs(x) <= r && Math.abs(y) <= r)
                return true;
        }
        // check 4rd square -- polygon
        if (x >= 0 && y <= 0){
            if ((x + Math.abs(y)) <= r/2)
                return true;
        }
        return false;
    }
}
