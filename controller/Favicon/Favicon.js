import { menu } from "../../models/menu.schema";
import { GetBase64 } from "../base64/base64.js";

export const GetFavicon = async (req, res) => {
    try {
        // Retrieve the menu document from the database
        const response = await menu.findOne({});
        console.log(response);
        if (!response || !response.favicon || !response.favicon.img) {
            // Handle the case where no favicon is found
            return res.status(404).json({ message: "Favicon not found" });
        }

        // Get the base64 string of the favicon
        let base64 = response.favicon.img;

        // If the base64 string has a prefix like 'data:image/png;base64,', remove it
        if (base64.startsWith('data:image/png;base64,')) {
            base64 = base64.replace('data:image/png;base64,', '');
        }

        // Decode the base64 string into a buffer
        const imageBuffer = Buffer.from(base64, 'base64');

        // Set the response type to the appropriate image format (PNG)
        res.setHeader('Content-Type', 'image/png');

        // Send the image buffer in the response
        res.send(imageBuffer);

    } catch (error) {
        // Catch any errors and respond with a 400 status
        res.status(400).json({ message: error.message });
    }
};
