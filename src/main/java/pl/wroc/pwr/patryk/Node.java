package pl.wroc.pwr.patryk;

import java.util.ArrayList;
import java.util.List;

public class Node {

    public boolean core;
    private List<Double> values;

    public Node() {
        this.core = false;
        this.values = new ArrayList<Double>();
    }

    public void setCore() {
        this.core = true;
    }

    public List<Double> getValues() {
        return values;
    }

    public void setValues(List<Double> values) {
        this.values = values;
    }

    public void addValue(Double value) {
        this.values.add(value);
    }

    public int getDimension() {
        return values.size();
    }

    public double getSum() {
        double sum = 0;
        for (double it : values) {
            sum += it;
        }
        return sum;
    }
}
