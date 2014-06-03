package pl.wroc.pwr.patryk;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class Demo {
	
	public static void main(String[] args) 
		throws IOException
	{
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		String filename = "";
		System.out.println("\nWorking Directory = " + System.getProperty("user.dir"));

		if (args.length == 0) {
			System.err.println("Pass filenames to load as parameters!");
		}

		System.out.println("Until what k create the graphs?");
		int k = Integer.parseInt(br.readLine());

		System.out.println("Show kNN graphs visualizations? [yY/nN]");
		String stringVis = br.readLine();
		boolean visualizations = stringVis.matches("[yY]");

		System.out.println("Save pearson's correlation vs inDegree graph? [yY/nN]");
		String stringSave = br.readLine();
		boolean saveGraphImage = stringSave.matches("[yY]");

    long startTime = System.currentTimeMillis();

		for (int j = 0; j < args.length; j++) {
			filename = args[j];

			GraphCalculations calculator = 
					new GraphCalculations(filename, k, visualizations, saveGraphImage);
			calculator.start();
		}

    long endTime = System.currentTimeMillis();
    System.out.println("\n\nTime: " + (endTime - startTime) / 1000f + "s.");

	}
}
