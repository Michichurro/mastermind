import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

/**
 * Exports a DOM element as a PDF.
 * @param {HTMLElement} element - The element to capture.
 * @param {string} filename - The output filename (without .pdf).
 */
export const exportElementAsPdf = async (element, filename = 'brand-soul-result') => {
    if (!element) return;

    try {
        // Capture the element as a canvas
        const canvas = await html2canvas(element, {
            scale: 2,          // 2x for retina/high-quality
            useCORS: true,     // Allow cross-origin images (logos, SVGs)
            allowTaint: false,
            backgroundColor: '#1e1b4b', // Match app dark purple background
            logging: false,
        });

        const imgData = canvas.toDataURL('image/png');
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;

        // A4 dimensions in mm: 210 x 297
        // Convert canvas px to mm at 96 dpi
        const pdfWidth = 210;
        const pdfHeight = (canvasHeight * pdfWidth) / canvasWidth;

        const pdf = new jsPDF({
            orientation: pdfHeight > pdfWidth ? 'portrait' : 'landscape',
            unit: 'mm',
            format: [pdfWidth, pdfHeight],
        });

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`${filename}.pdf`);
    } catch (err) {
        console.error('PDF export failed:', err);
    }
};
