package pl.wroc.pwr.patryk;

public class DistanceTo implements Comparable<DistanceTo> {
	
	private double mDistance;
	private Node mNode;

	public DistanceTo(double mDistance, Node mNode) {
		this.mDistance = mDistance;
		this.mNode = mNode;
	}

	@Override
    public int compareTo(DistanceTo other) {
        if (this.mDistance > other.mDistance)
            return 1;
        else
        if (this.mDistance < other.mDistance)
            return -1;
        else
            return 0;
    }


	public Node getNode() {
		return mNode;
	}

}
