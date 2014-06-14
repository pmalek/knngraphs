package pl.wroc.pwr.patryk;

import java.awt.Color;
import java.awt.geom.Ellipse2D;
import java.io.FileOutputStream;
import java.io.IOException;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
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

public class Plot extends JFrame {

    private static final Color COLOR_FIRST = new Color(0.0f, 0.3f, 1.0f, 0.3f);
    private static final Color COLOR_SECOND = new Color(0.0f, 0.0f, 0.0f, 0.3f);
    private static final Color COLOR_THIRD = new Color(0.0f, 0.7f, 0.0f, 0.3f);
    private static final Color[] COLORS = {COLOR_FIRST, COLOR_SECOND, COLOR_THIRD};
    private static final Ellipse2D.Double POINT_SHAPE = new Ellipse2D.Double(-2.5, -2.5, 7.0, 7.0);

    private static final long serialVersionUID = 8083971727860355817L;
    private int width = 1366;
    private int height = 768;
    private String xAxisLabel;
    private String yAxisLabel;
    private List<String> dataLabelsList;
    private String filename;

    public Plot(String filename,
            String xAxisLabel,
            String yAxisLabel,
            List<String> dataLabelsList) {
        super(filename);
        this.filename = filename;
        setDefaultCloseOperation(EXIT_ON_CLOSE);
        setSize(width - 10, height - 40);
        this.xAxisLabel = xAxisLabel;
        this.yAxisLabel = yAxisLabel;
        this.dataLabelsList = dataLabelsList;
    }

    public void showGraph(
            List<Integer> x,
            List<ArrayList<Double>> dataSeriesList,
            double maxYValue,
            boolean saveFile,
            double xCrossPoint) {

        DataTable data = null;
        // 1 more is for the X axis
        data  = new DataTable(1 + dataSeriesList.size(), Double.class);
        for (int i = 0; i < x.size(); i++) {
            List<Double> temp = new ArrayList<Double>();
            temp.add( new Double(x.get(i)));
            for (List<Double> current : dataSeriesList) {
                temp.add(current.get(i));
            }
            data.add(temp);
        }

        List<DataSeries> currentDataSeriesList = new ArrayList<DataSeries>();
        DataSeries[] currentDataSourceArray = new DataSeries[dataLabelsList.size()];

        for (int i = 0; i < dataLabelsList.size(); i++) {
            currentDataSourceArray[i] =
                    new DataSeries(dataLabelsList.get(i), data, 0,  i+1);
            currentDataSeriesList.add(new DataSeries(dataLabelsList.get(i), data, 0, i+1));
        }

        XYPlot plot = new XYPlot(currentDataSourceArray);
        //XYPlot plot = new XYPlot((DataSource[]) currentDataSeriesList.toArray());

        // Draw a tick mark and a grid line every 10 units along x axis
        int x_scale = 1;
        if (x.size() > 20) {
            Collections.sort(x);
            x_scale = x.get(currentDataSeriesList.get(0).getRowCount() - 1) / 20;
        }
        plot.getAxisRenderer(XYPlot.AXIS_X).setTickSpacing(x_scale);

        // Draw a tick mark and a grid line every  ?????
        BigDecimal maxYBigDecimal = new BigDecimal(maxYValue / 20);
        int placesToRound = 1;
        maxYBigDecimal = maxYBigDecimal.setScale(placesToRound, RoundingMode.CEILING);
        plot.getAxisRenderer(XYPlot.AXIS_Y).setTickSpacing( maxYBigDecimal.doubleValue() );

        for (int i = 0; i < currentDataSourceArray.length; i++) {
            LineRenderer lines = new DefaultLineRenderer2D();
            lines.setColor(COLORS[i]);
            plot.setLineRenderer(currentDataSourceArray[i], lines);

            PointRenderer points = new DefaultPointRenderer2D();
            points.setShape(POINT_SHAPE);
            points.setColor(COLORS[i]);
            plot.setPointRenderer(currentDataSourceArray[i], points);
        }

        getContentPane().add(new InteractivePanel(plot));
        // plot.getNavigator().setZoom(2f);

        // plot.getTitle().setText("k (" + x.get(0) + "," +
        // x.get(firstDataSeries.size()-1) + ") for " + x.size() + " graphs.");
        plot.getAxisRenderer(XYPlot.AXIS_X).setLabel(xAxisLabel);
        plot.getAxisRenderer(XYPlot.AXIS_Y).setLabel(yAxisLabel);
        plot.setLegendVisible(true);

        if (saveFile) {
            try {
                DrawableWriterFactory
                        .getInstance()
                        .get("image/svg+xml")
                        .write(plot,
                                new FileOutputStream(filename + "_" + System.currentTimeMillis() + ".svg"),
                                1366, 768);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        this.setVisible(true);
    }
}
