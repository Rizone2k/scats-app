import { Buffer } from "buffer";
export const b64toBuffer = (b64Data) => {
    const buffer = Buffer.from(b64Data, "base64");
    console.log(buffer);

    const blob = new Blob([buffer], { type: contentType });
    return blob;
}