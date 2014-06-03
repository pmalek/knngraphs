package pl.wroc.pwr.patryk;

import java.awt.Color;
import java.awt.geom.Ellipse2D;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Collections;
import java.util.List;

import javax.swing.JFrame;

import de.erichseifert.gral.data.DataSeries;
import de.erichseifert.gral.data.DataTable;
import de.erichseifert.gral.io.plots.DrawableWriterFactory;
import de.erichseifert.gral.plots.XYPlot;
import de.erichseifert.gral.plots.lines.DefaultLineRenderer2D;
import de.erichseifert.gral.plots.lines.LineRenderer;
import de.erichseifert.gral.plots.points.DefaultPointRenderer2D;
import de.erichseifert.gral.plots.points.PointRenderer;
import de.erichseifert.gral.ui.InteractivePanel;

public class Plot extends JFrame{
 
	private static final long serialVersionUID = 8083971727860355817L;
	private int width 	= 1366;
	private int height 	= 768;
	private String xAxisLabel;
	private String yAxisLabel;
	private String firstDataSeriesLabel;
	private String secondDataSeriesLabel;
	
	public Plot(
			String filename, 
			String xAxisLabel, 
			String yAxisLabel,
			String firstDataSeriesLabel,
			String secondDataSeriesLabel) {
        super(filename);
		setDefaultCloseOperation(EXIT_ON_CLOSE);
        setSize(width - 10, height -40 );
        this.xAxisLabel = xAxisLabel;
        this.yAxisLabel = yAxisLabel;
        this.firstDataSeriesLabel = firstDataSeriesLabel;
        this.secondDataSeriesLabel = secondDataSeriesLabel;
    }
	
	@SuppressWarnings("unchecked")
    public void showGraph(
    		List<Integer> x, 
    		List<Double> firstDataSeries, 
    		List<Double> secondDataSeries, 
    		boolean saveFile){
    	
    	DataTable data = null;
    	if(secondDataSeries != null){
    		data = new DataTable(Integer.class, Double.class, Double.class);
        	for (int i = 0; i < x.size(); i++) {
    			data.add(x.get(i), firstDataSeries.get(i), secondDataSeries.get(i));
    		}    		
    	}else{
    		data = new DataTable(Integer.class, Double.class);
        	for (int i = 0; i < x.size(); i++) {
    			data.add(x.get(i), firstDataSeries.get(i));
    		}   		
    	}
    	
    	DataSeries firstSeries = new DataSeries(firstDataSeriesLabel, data, 0, 1);
    	DataSeries secondSeries = null;
    	if (secondDataSeriesLabel != null)
    		secondSeries = new DataSeries(secondDataSeriesLabel, data, 0, 2);
    	
    	XYPlot plot = null;
    	if( secondSeries != null) 
    		plot = new XYPlot(firstSeries, secondSeries);
    	else 
    		plot = new XYPlot(firstSeries);
  
    	// Draw a tick mark and a grid line every 10 units along x axis
    	int x_scale = 1;
    	if (x.size() > 20){
    		Collections.sort(x);
    		x_scale = x.get(firstDataSeries.size()-1) / 20;
    	}
    	plot.getAxisRenderer(XYPlot.AXIS_X).setTickSpacing(x_scale);
    	// Draw a tick mark and a grid line every 20 units along y axis
    	int y_scale = 1;
    	List<Double> tempFirstSeries = firstDataSeries;
    	if (firstDataSeries.size() > 20){
    		Collections.sort(tempFirstSeries);
    		y_scale = (int) (tempFirstSeries.get(tempFirstSeries.size()-1) / 20);
    	}    	
    	plot.getAxisRenderer(XYPlot.AXIS_Y).setTickSpacing(y_scale);
    	
    	LineRenderer lines1 = new DefaultLineRenderer2D();
    	lines1.setColor(new Color(0.0f, 0.3f, 1.0f, 0.3f));
    	plot.setLineRenderer(firstSeries, lines1);
    	
    	if( secondSeries != null ) {
    		LineRenderer lines2 = new DefaultLineRenderer2D();
        	lines2.setColor(new Color(0.0f, 0.0f, 0.0f, 0.3f));
        	plot.setLineRenderer(secondSeries, lines2);	
    	}
    	
    	PointRenderer points1 = new DefaultPointRenderer2D();
    	points1.setShape(new Ellipse2D.Double(-3.0, -3.0, 6.0, 6.0));
    	points1.setColor(new Color(0.0f, 0.3f, 1.0f, 0.3f));
    	plot.setPointRenderer(firstSeries, points1);
    	
    	if( secondSeries != null ) {
	    	PointRenderer points2 = new DefaultPointRenderer2D();
	    	points2.setShape(new Ellipse2D.Double(-2.5, -2.5, 5.0, 5.0));
	    	points2.setColor(new Color(0.0f, 0.0f, 0.0f, 0.3f));
	    	plot.setPointRenderer(secondSeries, points2);
    	}
	    	
    	getContentPane().add(new InteractivePanel(plot));
    	//plot.getNavigator().setZoom(2f);
    	
    	plot.getTitle().setText("k (" + x.get(0) + "," + x.get(firstDataSeries.size()-1) + 
    			") for " + x.size() + " graphs.");
    	plot.getAxisRenderer(XYPlot.AXIS_X).setLabel(xAxisLabel);
    	plot.getAxisRenderer(XYPlot.AXIS_Y).setLabel(yAxisLabel);
    	plot.setLegendVisible(true);
    	
    	if (saveFile) {
			try {
				DrawableWriterFactory
						.getInstance()
						.get("image/svg+xml")
						.write(plot,
								new FileOutputStream(System.currentTimeMillis()
										+ ".svg"), 1366, 768);
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		this.setVisible(true);    	
    }
}
