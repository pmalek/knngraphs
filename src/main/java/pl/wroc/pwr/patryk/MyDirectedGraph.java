package pl.wroc.pwr.patryk;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.Iterator;

import org.apache.commons.math3.stat.correlation.PearsonsCorrelation;

import edu.uci.ics.jung.graph.DirectedSparseGraph;
//import edu.uci.ics.jung.graph.event.GraphEvent.Vertex;
import edu.uci.ics.jung.graph.util.EdgeType;
import edu.uci.ics.jung.graph.util.Pair;

public class MyDirectedGraph{

	/**
	 * 
	 */
	@SuppressWarnings("unused")
	private static final long serialVersionUID = 1562220530184745366L;
	private DirectedSparseGraph<Node, Link> mGraph;
	private int mDimension;
	//private int mCoreSize;
	private int k;
	private String filename;
	private Thread thread;
	private double pearsonsCorrelation;
	
	public MyDirectedGraph(DirectedSparseGraph<Node, Link> mGraph) {
		this.mDimension = 0;
		this.mGraph = mGraph;
		//this.mCoreSize = 0;
		this.k = 1;
		this.filename = "";
		this.pearsonsCorrelation = 0;
	}
	
	public MyDirectedGraph(int k, String filename) {
		//this.mCoreSize = coresize;
		this.mDimension = 0;
		this.mGraph = new DirectedSparseGraph<Node, Link>();
		this.k = k < 1 ? 1 : k;
		this.filename = filename;
		this.pearsonsCorrelation = 0;
		
		//this.thread = new Thread(this, filename);
		//thread.start();
	}

	public MyDirectedGraph() {
		//this.mCoreSize = 0;
		this.mDimension = 0;
		this.mGraph = new DirectedSparseGraph<Node, Link>();
		this.k = 1;
		this.filename = "";
		this.pearsonsCorrelation = 0;
	}

	public boolean loadFile(){
		BufferedReader in = null;
		String nextLine = "";
		String pattern = "(\\d+)(\\.\\d+)?(;(\\d+)(\\.\\d+))?.*";
		String datePattern = "(\\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01]));";
		//Node[] core = new Node[mCoreSize];
		
		try {
			in = new BufferedReader(new FileReader(filename));
			nextLine = in.readLine();
			/*int _core = 0;*/
			while( nextLine != null ){
				nextLine = nextLine.replaceAll(datePattern, "");
				if( nextLine.matches(pattern) ){
					Node vertex = new Node();
					
					//iterate over all values in a row (split by ';')
					for (String s : nextLine.split(";")) {
						try {
							vertex.addValue( Float.parseFloat(s) );
						} catch (NumberFormatException e) {
							
							e.printStackTrace();
						}
					}
					
					if( vertex.getValues().size() > mDimension)
						mDimension = vertex.getValues().size();
					
					mGraph.addVertex(vertex);					
				}

				nextLine = in.readLine();
			}
			in.close();
		} catch (Exception e) {
			System.err.println("There was a problem with " + filename);
			System.err.println(e.getMessage());
			try {
				in.close();
			} catch (IOException e1) {
				e1.printStackTrace();
				return false;
			}
			return false;
		}

		for (Iterator<Node> it1 = mGraph.getVertices().iterator(); it1.hasNext();) {
			Node n1 = (Node) it1.next();
		ArrayList<DistanceTo> distances = new ArrayList<DistanceTo>();

			for (Iterator<Node> it2 = mGraph.getVertices().iterator(); it2
					.hasNext();) {
				Node n2 = (Node) it2.next();
				if (n1 != n2) {
					double d = getDistance(n1, n2);
					distances.add(new DistanceTo(d, n2));
				}
			}
			Collections.sort(distances);

			for (int i = 0; i < k; i++) {
				Node dst = distances.get(i).getNode();
				mGraph.addEdge(new Link(), n1, dst, EdgeType.DIRECTED);
			}		
		}

		return true;
	}
	
	public void printGraph(){
		System.out.println("Graph with " + mGraph.getVertexCount() + "vertices.");
		for (Node it : mGraph.getVertices()) {
			System.out.println("\t" + it.getValues());
		}
	}
	
	public int getDimension(){
		return mDimension;
	}
	
	public void printLinks(){
		for (Link e : mGraph.getEdges()) {
			System.out.println(e.toString());
		}
	}
	
	public int getEdgeCount(){
		return mGraph.getEdgeCount();
	}
	
	public int getVerticesCount(){
		return mGraph.getVertexCount();
	}
	
	public double getDistance(Node n1, Node n2){
		//Euclidean distance 
		
		if(n1.getDimension() != n2.getDimension()){
			System.err.println("Nodes are not of the same dimension");
			return -1;
		}
		
		double sum = 0;
		double temp = 0;
		for (int i = 0; i < n1.getDimension(); i++) {
			temp = n2.getValues().get(i) - n1.getValues().get(i);
			sum += temp * temp;
		}
		return  Math.sqrt(sum);
	}

	public DirectedSparseGraph<Node, Link> getGraph(){
		return mGraph;
	}

	public double getPearsonsCorrelation() {
		if(this.pearsonsCorrelation != 0 ) {
			return this.pearsonsCorrelation;
		}
		int numLinks = mGraph.getEdgeCount();
		double[] degSrc = new double[numLinks];
		double[] degDst = new double[numLinks];
		
		Collection<Link> links = mGraph.getEdges();
		Iterator<Link> lit = links.iterator();
		int i = 0;
		while (lit.hasNext()) {
			Link l = lit.next();
			Pair<Node> endPoints = mGraph.getEndpoints(l);
			degSrc[i] = mGraph.inDegree(endPoints.getFirst());
			degDst[i] = mGraph.inDegree(endPoints.getSecond());
			i++;
		}
		
		PearsonsCorrelation pc = new PearsonsCorrelation();
		return pc.correlation(degSrc, degDst);
	}	
}
