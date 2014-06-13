package pl.wroc.pwr.patryk;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.List;

import net.sourceforge.argparse4j.ArgumentParsers;
import net.sourceforge.argparse4j.inf.ArgumentParser;
import net.sourceforge.argparse4j.inf.ArgumentParserException;
import net.sourceforge.argparse4j.inf.Namespace;

public class Demo {

    public static void main(String[] args) throws IOException {
        int argK = 0;
        List<String> argFilenames = null;

        ArgumentParser parser = ArgumentParsers.newArgumentParser("kNN graphs")
            .defaultHelp(true)
            .description("\nCalculate kNN graphs for given dataset files.");
        parser.addArgument("-k")
            .setDefault("10")
            .help("k parameter with which kNN graphs will be generated");
        parser.addArgument("file")
            .nargs("+")
            .help("File(s) to calculate checksum");
        Namespace ns = null;
        try {
            ns = parser.parseArgs(args);
        } catch (ArgumentParserException e) {
            parser.handleError(e);
            System.exit(1);
        }

        argFilenames = ns.<String> getList("file");

        try {
            argK = Integer.parseInt(ns.getString("k"));
        } catch (Exception e) {
            System.err.println("\nArgument 'k' has to be an integer!");
            System.exit(1);
        }

        // --------------------------

        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String filename = "";
        System.out.println("\nWorking Directory = "
                + System.getProperty("user.dir"));

        if (args.length == 0) {
            System.err.println("\nPass filenames to load as parameters!");
        }

        if (argK == 0) {
            System.out.println("Until what k create the graphs?");
            argK = Integer.parseInt(br.readLine());
        }

        System.out.println("Show kNN graphs visualizations? [yY/nN]");
        String stringVis = br.readLine();
        boolean visualizations = stringVis.matches("[yY]");

        System.out.println("Save pearson's correlation vs inDegree graph? [yY/nN]");
        String stringSave = br.readLine();
        boolean saveGraphImage = stringSave.matches("[yY]");

        System.out.println("Calculating kNN graphs for k=" + argK);

        // long startTime = System.currentTimeMillis();

        for (int j = 0; j < argFilenames.size(); j++) {
            filename = argFilenames.get(j);

            GraphCalculations calculator =
                    new GraphCalculations(filename, argK, visualizations, saveGraphImage);
            calculator.start();
        }
    }
}
