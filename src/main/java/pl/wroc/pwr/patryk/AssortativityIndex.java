package pl.wroc.pwr.patryk;

import java.util.Collection;
import java.util.Iterator;

import org.apache.commons.math3.stat.correlation.PearsonsCorrelation;

import edu.uci.ics.jung.graph.UndirectedSparseGraph;
import edu.uci.ics.jung.graph.util.Pair;

/**
 * Computes assortativity index for a given (undirected) graph
 * 
 * Used libraries: JUNG (Java universal graph library) and Commons-math
 * 
 * @author svc
 */
public class AssortativityIndex {

	private UndirectedSparseGraph<Node, Link> g;
	
	public AssortativityIndex(UndirectedSparseGraph<Node, Link> g) {
		this.g = g;
	}
	
	public double compute() {
		int numLinks = g.getEdgeCount();
		double[] degSrc = new double[numLinks];
		double[] degDst = new double[numLinks];
		
		Collection<Link> links = g.getEdges();
		Iterator<Link> lit = links.iterator();
		int i = 0;
		while (lit.hasNext()) {
			Link l = lit.next();
			Pair<Node> endPoints = g.getEndpoints(l);
			degSrc[i] = g.degree(endPoints.getFirst());
			degDst[i] = g.degree(endPoints.getSecond());
			i++;
		}
		
		PearsonsCorrelation pc = new PearsonsCorrelation();
		return pc.correlation(degSrc, degDst);
	}	
}
