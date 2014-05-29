package pl.wroc.pwr.patryk;

import java.util.ArrayList;
import java.util.List;

public class Node { 
	
	public boolean core;
	private List<Float> values;
	
	public Node() {
		this.core = false;
		this.values = new ArrayList<Float>();
	}

	public void setCore() {
		this.core = true;
	}

	public List<Float> getValues() {
		return values;
	}

	public void setValues(List<Float> values) {
		this.values = values;
	}
	
	public void addValue(Float value){
		this.values.add(value);
	}
	
	public int getDimension(){
		return values.size();
	}
}
