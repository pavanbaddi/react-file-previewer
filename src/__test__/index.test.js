import React from "react";
import {render, screen} from "@testing-library/react";
import user from "@testing-library/user-event";
import PdfContextProvider from "../Contexts/PdfContext";
import App from "../App";
import pdfbase64 from "./utils/pdfbase64";
import {act} from "react-dom/test-utils"
import ReactDOM from "react-dom/client"

const Component = ( {children} ) => {
    return (
        <React.StrictMode>
            <PdfContextProvider>
                {children}
            </PdfContextProvider>
        </React.StrictMode>
    )
}


it("must render", () => {
    render(<Component ><App/></Component>)
    const fileInput = screen.getByTestId("file-input");
    expect(fileInput).toBeInTheDocument()
})

it("before uploading any file", () => {
    render(<Component ><App/></Component>)
    let listing = null;
    
    try {
        listing = screen.getByTestId("listing")
    } catch (error) {
        
    }
    
    expect(listing).not.toBeInTheDocument()
})


let container = null;

beforeEach(() => {
    container = document.createElement("div")
    document.body.appendChild(container)
})

afterEach(() => {
    document.body.removeChild(container);
    container = null;
  });

it("upload a pdf file", () => {
    global.URL.createObjectURL = jest.fn((file) => "")

    act(() => {
        ReactDOM.createRoot(container).render(<Component ><App/></Component>)
    });

    const fileInput = screen.getByTestId("file-input");

    const blobOptions= {type: "application/pdf"};
    const pdfBlob = new Blob([pdfbase64], blobOptions )
    const pdfFile = new File([pdfBlob], "test-pdf.pdf", {type: "application/pdf"})
    File.prototype.text = jest.fn().mockResolvedValueOnce(pdfbase64)
    
    act(() => {
        user.upload(fileInput, pdfFile)
    });

    const listing = screen.getByTestId("listing")
    
    expect(listing.childElementCount).toEqual(1);
})
