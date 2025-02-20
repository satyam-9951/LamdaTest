// Import Playwright
const { chromium } = require('@playwright/test');

(async () => {
    // Step 1: Launch Browser and Open Wikipedia Page
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(120000);

    console.log("Navigating to MS Dhoni's Wikipedia page...");
    await page.goto('https://www.news18.com/cricket/icc-world-cup-2023-reserve-day-semi-finals-final-rain-wash-out-joint-winners-8661316.html', { 
        waitUntil: 'domcontentloaded', 
        timeout: 60000 
    });

    // Step 2: Inject TensorFlow.js and COCO-SSD Model Scripts
    console.log("Loading TensorFlow.js and COCO-SSD model...");
    await page.addScriptTag({ url: 'https://cdn.jsdelivr.net/npm/@tensorflow/tfjs' });
    await page.addScriptTag({ url: 'https://cdn.jsdelivr.net/npm/@tensorflow-models/coco-ssd' });

    // Step 3: Perform Object Detection in the Browser
    const detectedObjects = await page.evaluate(async () => {
        try {
            // Load the Coco-SSD model
            const model = await cocoSsd.load();

            // Locate the image using XPath
            const image = document.evaluate(
                "//img[@title='India, New Zealand, South Africa and Australia are in the semis. (AFP Photo)']", 
                document, 
                null, 
                XPathResult.FIRST_ORDERED_NODE_TYPE, 
                null
            ).singleNodeValue;

            if (!image) {
                throw new Error("❌ No image found on the page");
            }

            console.log("✔ Image found:", image.src);

            // Create a new image element to bypass CORS issues
            const newImage = new Image();
            newImage.crossOrigin = "anonymous"; // Bypass CORS
            newImage.src = image.src;

            // Wait for the new image to load
            await new Promise((resolve, reject) => {
                newImage.onload = resolve;
                newImage.onerror = reject;
            });

            console.log("✔ Image loaded successfully!");

            // Perform object detection
            const predictions = await model.detect(newImage);

            // Extract and return the detected objects
            return predictions.map(prediction => ({
                class: prediction.class,
                score: prediction.score.toFixed(2)
            }));
        } catch (error) {
            console.error("❌ Error in object detection:", error.message);
            return [];
        }
    });

    // Step 4: Print the Detected Objects
    console.log("🎯 Detected Objects:");
    if (detectedObjects.length === 0) {
        console.log("❌ No objects detected.");
    } else {
        detectedObjects.forEach(obj => {
            console.log(`✔ ${obj.class} (Confidence: ${obj.score})`);
        });
    }

    // Step 5: Close the Browser
    console.log("Closing browser...");
    await browser.close();
})();
