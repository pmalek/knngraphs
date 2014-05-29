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
	
	public Plot(String filename, String xAxisLabel, String yAxisLabel) {
        super(filename);
		setDefaultCloseOperation(EXIT_ON_CLOSE);
        setSize(width - 10, height -40 );
        this.xAxisLabel = xAxisLabel;
        this.yAxisLabel = yAxisLabel;
    }
	
	@SuppressWarnings("unchecked")
    public void showGraph(
    		List<Integer> x, 
    		List<Double> y, 
    		List<Double>coefsOfVariation, 
    		boolean saveFile){
    	
    	DataTable data = new DataTable(Integer.class, Double.class, Double.class);

    	for (int i = 0; i < x.size(); i++) {
			data.add(x.get(i), y.get(i), coefsOfVariation.get(i));
		}
    	
    	DataSeries pearsonsSeries = new DataSeries("Pearsons Coefficient", data, 0, 1);
    	DataSeries varianceSeries = new DataSeries("Coefficient of variation", data, 0, 2);
    	
    	XYPlot plot = new XYPlot(pearsonsSeries, varianceSeries);
  
    	// Draw a tick mark and a grid line every 10 units along x axis
    	int x_scale = 1;
    	if (x.size() > 20){
    		Collections.sort(x);
    		x_scale = x.get(y.size()-1) / 20;
    	}
    	plot.getAxisRenderer(XYPlot.AXIS_X).setTickSpacing(x_scale);
    	// Draw a tick mark and a grid line every 20 units along y axis
    	plot.getAxisRenderer(XYPlot.AXIS_Y).setTickSpacing(0.05);
    	
    	LineRenderer lines1 = new DefaultLineRenderer2D();
    	lines1.setColor(new Color(0.0f, 0.3f, 1.0f, 0.3f));
    	plot.setLineRenderer(pearsonsSeries, lines1);
    	
    	LineRenderer lines2 = new DefaultLineRenderer2D();
    	lines2.setColor(new Color(0.0f, 0.0f, 0.0f, 0.3f));
    	plot.setLineRenderer(varianceSeries, lines2);
    	
    	PointRenderer points1 = new DefaultPointRenderer2D();
    	points1.setShape(new Ellipse2D.Double(-3.0, -3.0, 6.0, 6.0));
    	points1.setColor(new Color(0.0f, 0.3f, 1.0f, 0.3f));
    	plot.setPointRenderer(pearsonsSeries, points1);
    	
    	PointRenderer points2 = new DefaultPointRenderer2D();
    	points2.setShape(new Ellipse2D.Double(-2.5, -2.5, 5.0, 5.0));
    	points2.setColor(new Color(0.0f, 0.0f, 0.0f, 0.3f));
    	plot.setPointRenderer(varianceSeries, points2);
    	
    	getContentPane().add(new InteractivePanel(plot));
    	//plot.getNavigator().setZoom(2f);
    	
    	plot.getTitle().setText("k (" + x.get(0) + "," + x.get(y.size()-1) + 
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