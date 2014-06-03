package pl.wroc.pwr.patryk;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.apache.commons.math3.stat.descriptive.SummaryStatistics;

import edu.uci.ics.jung.graph.DirectedSparseGraph;

public class GraphCalculations implements Runnable {

	private String filename;
	private int k;
	private boolean visualizations;
	private boolean saveGraphImage;
	private Thread thread;
	
	public GraphCalculations(String filename, int k, boolean visualizations,
			boolean saveGraphImage) {
		this.filename = filename;
		this.k = k;
		this.visualizations = visualizations;
		this.saveGraphImage = saveGraphImage;
		this.thread = new Thread(this, filename);
	}

	@Override
	public void run() {
		System.out.println("\n************************************");
		System.out.println("filename \"" + filename + "\"");
		System.out.println();
		
		List<Double> pearsonsValues = new ArrayList<Double>();
		List<Integer> x = new ArrayList<Integer>();

		long startTime = System.currentTimeMillis();
		int totalKMaxInDegree = 0;
		SummaryStatistics totalInDegreeStats = new SummaryStatistics();
		totalInDegreeStats.addValue(0); // without this totalInDegreeStats.getMax() is NaN
		List<Double> coefsOfVariation = new ArrayList<Double>();
		List<Double> standardDeviationList = new ArrayList<Double>();
		List<Double> maxIndegreeList = new ArrayList<Double>();
		

		for (int i = 1; i <= k; i++) {
			SummaryStatistics inDegreeStats = new SummaryStatistics();

			MyDirectedGraph graph = new MyDirectedGraph(i, filename);
			graph.loadFile();

			// graph.printGraph();
			System.out.println("\nk = " + i);
			// graph.printLinks();
			System.out.println("Vertices count: \""	+ graph.getVerticesCount() + "\"");
			System.out.println("Dimension: \"" + graph.getDimension() + "\"");
			System.out.println("Edge count: \"" + graph.getEdgeCount() + "\"");
			double pearsonsCorrelation = graph.getPearsonsCorrelation();
			System.out.println("PearsonsCorrelation: \"" + pearsonsCorrelation + "\"");
			pearsonsValues.add(pearsonsCorrelation);
			
			int currentInDegree = 0;
			// check inDegree of all the nodes
			for (Iterator<Node> it = graph.getGraph().getVertices().iterator(); it.hasNext();) {
				Node node = (Node) it.next();
				DirectedSparseGraph<Node, Link> dirGraph = graph.getGraph();
				currentInDegree = dirGraph.inDegree(node);
				
				inDegreeStats.addValue(currentInDegree);
			}
			
			// X values for plot drawing
			x.add(i);
			double standardDeviation = inDegreeStats.getStandardDeviation();
			double coefficientOfVariation = standardDeviation/inDegreeStats.getMean();
			coefsOfVariation.add(coefficientOfVariation);

			if (visualizations) {
				new Visualize(graph.getGraph(), "k = " + i
						+ ",pearsonsCorrelation = " + pearsonsCorrelation);
			}
			
			maxIndegreeList.add(inDegreeStats.getMax());
			standardDeviationList.add(standardDeviation);
			
			// stats
			if( inDegreeStats.getMax() > totalInDegreeStats.getMax() ){
				totalInDegreeStats.addValue(inDegreeStats.getMax());
				totalKMaxInDegree = i;
			}
			System.out.println("Max in-degree="+inDegreeStats.getMax());
			System.out.println("Average in-degree: " + inDegreeStats.getMean());
			System.out.println("In-degree standard deviation: " + inDegreeStats.getStandardDeviation());
			System.out.println("Coefficient of variation: " + coefficientOfVariation);
			
/*			Printing all in degrees for each k
			String allInDegrees = "";
			for (Iterator<Integer> it = inDegrees.iterator(); it.hasNext();) {
				Integer integ = (Integer) it.next();
				allInDegrees += integ + " ";
			}
			System.out.println(allInDegrees);*/
		}

		long endTime = System.currentTimeMillis();
		System.out.println("\n\nFile load + graphs creation: " + (endTime - startTime) / 1000f + "s.");
		
		System.out.println("\nMax in-degree for k=" + totalKMaxInDegree + ", max_in-degree=" + totalInDegreeStats.getMax());
		System.out.println();
		
		Plot plot = new Plot(
				filename, 
				"K", 
				"Pearson's correlation coefficient",
				"Pearsons Coefficient",
				"Coefficient of variation");
		plot.showGraph(x, pearsonsValues, coefsOfVariation, saveGraphImage);
		
		Plot standardDeviationOfInDegreePlot = new Plot(
				filename,
				"K",
				"Standard deviation of in-degree",
				"Standard deviation of in-degree",
				null);
		standardDeviationOfInDegreePlot.showGraph(x, standardDeviationList, null, false);
		
		Plot maxInDegreePlot = new Plot(
				filename,
				"K",
				"Max in-degree",
				"Max in-degree",
				null);
		maxInDegreePlot.showGraph(x, maxIndegreeList, null, false);
	}
	
	public void start(){
		thread.start();
	}

}
