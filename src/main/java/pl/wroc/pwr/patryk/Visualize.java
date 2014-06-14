package pl.wroc.pwr.patryk;

import java.awt.Color;
import java.awt.Dimension;
import java.awt.Frame;
import java.awt.Graphics;
import java.awt.Image;
import java.awt.Paint;
import java.awt.Point;
import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;
import java.util.Iterator;

import org.apache.commons.collections15.Transformer;
import org.apache.commons.math3.stat.descriptive.DescriptiveStatistics;

import edu.uci.ics.jung.algorithms.layout.ISOMLayout;
import edu.uci.ics.jung.graph.DirectedSparseGraph;
import edu.uci.ics.jung.visualization.VisualizationImageServer;

public class Visualize extends Frame {

    private static final long serialVersionUID = 5430450231134733514L;

    private Image img;

    public Visualize(DirectedSparseGraph<Node, Link> g, String label) {
        super(label);

        int width = 1366;
        int height = 768;

        ISOMLayout<Node, Link> kl = new ISOMLayout<Node, Link>(g);
        while (!kl.done())
            kl.step();

        Iterator<Node> it = g.getVertices().iterator();
        final DescriptiveStatistics stats = new DescriptiveStatistics();
        while (it.hasNext()) {
            Node n = it.next();
            stats.addValue(n.getSum());
            if (n.core) {

            } else {
            }
        }

        final double twiceMean = stats.getPercentile(75);

        VisualizationImageServer<Node, Link> vis = new VisualizationImageServer<Node, Link>(
                kl,
                new Dimension(width - 20, height - 20));

        Transformer<Node, Paint> vertexColor = new Transformer<Node, Paint>() {
            public Paint transform(Node n) {
                if (n.getSum() > twiceMean)
                    return Color.RED;
                else
                    return Color.BLUE;
            }
        };

        vis.getRenderContext().setVertexFillPaintTransformer(vertexColor);

        img = vis.getImage(new Point(width / 2, height / 2), new Dimension(width, height));

        setSize(width, height);
        setVisible(true);
        addWindowListener(new WindowAdapter() {
            public void windowClosing(WindowEvent we) {
                dispose();
            }
        });
    }

    public void update(Graphics g) {
        paint(g);
    }

    public void paint(Graphics g) {
        if (img != null)
            g.drawImage(img, 10, 10, this);
    }

}
