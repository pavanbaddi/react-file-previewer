import React from "react";
import {render, screen, fireEvent } from "@testing-library/react";
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

describe("test upload journey", () => {
    global.URL.createObjectURL = jest.fn((file) => "")

    render(<Component ><App/></Component>)
    
    let fileInput=null, listing=null;

    test("must render", () => {
        fileInput = screen.getByTestId("file-input");
        expect(fileInput).toBeInTheDocument()
    })

    test("before uploading any file", () => {
        expect(screen.queryByTestId("listing")).not.toBeInTheDocument()
    });

    test("upload a pdf file", async () => {      
        
        const observe = jest.fn();
        const unobserve = jest.fn();
        const disconnect = jest.fn();
        global.IntersectionObserver = jest.fn(() => ({
            observe,
            unobserve,
            disconnect
        }));
        
        render(<Component ><App/></Component>)

        const blobOptions= {type: "application/pdf"};
        const pdfBlob = new Blob([pdfbase64], blobOptions )
        const pdfFile = new File([pdfBlob], "test-pdf.pdf", {type: "application/pdf"})
        File.prototype.text = jest.fn().mockResolvedValueOnce(pdfbase64)
        
        fileInput = screen.getByTestId("file-input");
        
        fireEvent.change(fileInput, {
            target: {
                files: [pdfFile, pdfFile]
            }
        })

        const listing = await screen.findByTestId("listing")
        expect(listing.childElementCount).toBeGreaterThanOrEqual(1);
        
        const firstListItem = screen.getByTestId("listing-li-0")
        fireEvent(firstListItem, new MouseEvent("click", {
            bubbles: true,
        }))
        
        const viewer = await screen.findByTestId("viewer")
        expect(viewer.childElementCount).toBeGreaterThanOrEqual(1)
    })
})

