import React from "react";
import {render, screen} from "@testing-library/react";
import user from "@testing-library/user-event";
import PdfContextProvider from "../Contexts/PdfContext";
import App from "../App";
import pdfbase64 from "./utils/pdfbase64";

const Component = ( {children} ) => {
    return (
        <React.StrictMode>
            <PdfContextProvider>
                {children}
            </PdfContextProvider>
        </React.StrictMode>
    )
}

it("must render", async() => {
    global.URL.createObjectURL = jest.fn((file) => "")
    render(<Component ><App/></Component>)
    const blobOptions= {type: "application/pdf"};
    const pdfBlob = new Blob([pdfbase64], blobOptions )
    const pdfFile = new File([pdfBlob], "test-pdf.pdf", {type: "application/pdf"})
    File.prototype.text = jest.fn().mockResolvedValueOnce(pdfbase64)
    const fileInput = screen.getByTestId("file-input");
    user.upload(fileInput, pdfFile)
    const listing = screen.getByTestId("listing")
    expect(listing).toBeInTheDocument();
})