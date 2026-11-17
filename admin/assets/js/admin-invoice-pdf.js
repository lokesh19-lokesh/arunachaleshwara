/* ============================================================
   ARUNACHALESHWARA – Branded PDF Invoice Generator (jsPDF)
   ============================================================ */

async function generateInvoicePDF(invoice, orgSettings = null) {
  if (typeof window.jspdf === 'undefined' || !window.jspdf.jsPDF) {
    alert('PDF library (jsPDF) is still loading. Please try again in a moment.');
    return;
  }

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

  const org = orgSettings || {
    org_name: 'ARUNACHALESHWARA TOURS & TRAVELS',
    tagline: 'Divine Pilgrimage & Hospitality Services',
    address: 'Avulpet Bypass, Near Arunachaleswarar Temple, Tiruvannamalai - 606601, Tamil Nadu',
    phone: '+91 90105 15341',
    email: 'arunachalatoursandtravels@gmail.com',
    gstin: '',
    terms: '1. Check-in: 12:00 PM | Check-out: 11:00 AM.\n2. Please present a valid Govt. photo ID proof at check-in.\n3. Advance payment is subject to cancellation policy.\n4. Thank you for choosing Arunachaleswara Tours & Travels. Om Namah Shivaya.'
  };

  // Colors
  const maroon = [69, 18, 14];
  const yellow = [255, 201, 8];
  const cream = [255, 249, 239];
  const textDark = [30, 41, 59];
  const textMuted = [100, 116, 139];

  // Top Banner Bar
  doc.setFillColor(...maroon);
  doc.rect(0, 0, 210, 38, 'F');
  doc.setFillColor(...yellow);
  doc.rect(0, 38, 210, 2.5, 'F');

  // Brand Title
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.text(org.org_name, 15, 16);

  doc.setTextColor(...yellow);
  doc.setFontSize(9.5);
  doc.setFont('helvetica', 'normal');
  doc.text(org.tagline, 15, 22);

  doc.setTextColor(235, 235, 235);
  doc.setFontSize(8.5);
  doc.text(org.address, 15, 28);
  doc.text(`Phone: ${org.phone}  |  Email: ${org.email}` + (org.gstin ? `  |  GSTIN: ${org.gstin}` : ''), 15, 33);

  // Invoice Title Badge on Right
  doc.setTextColor(255, 201, 8);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.text('INVOICE', 195, 19, { align: 'right' });

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(9.5);
  doc.text(invoice.invoice_number || 'ARN-INV-2026-00001', 195, 26, { align: 'right' });
  doc.setFontSize(8.5);
  doc.text(`Date: ${formatDate(invoice.invoice_date)}`, 195, 32, { align: 'right' });

  // Customer & Booking Info Box
  let y = 48;
  doc.setFillColor(...cream);
  doc.setDrawColor(230, 210, 170);
  doc.roundedRect(15, y, 180, 36, 3, 3, 'FD');

  // Left: Bill To
  doc.setTextColor(...maroon);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text('BILLED TO (CUSTOMER)', 20, y + 7);

  doc.setTextColor(...textDark);
  doc.setFontSize(11);
  doc.text(invoice.customer_name || 'Devotee', 20, y + 14);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.text(`Mobile: ${invoice.customer_mobile || 'N/A'}`, 20, y + 20);
  if (invoice.customer_email) {
    doc.text(`Email: ${invoice.customer_email}`, 20, y + 26);
  }

  // Right: Booking Metadata
  doc.setTextColor(...maroon);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text('BOOKING REFERENCE', 115, y + 7);

  doc.setTextColor(...textDark);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.text(`Booking ID: ${invoice.booking_code || 'N/A'}`, 115, y + 14);
  if (invoice.room_details) {
    doc.text(`Room / Service: ${invoice.room_details}`, 115, y + 20);
  }
  if (invoice.check_in && invoice.check_out) {
    doc.text(`Stay: ${formatDate(invoice.check_in)} to ${formatDate(invoice.check_out)}`, 115, y + 26);
  }
  doc.text(`Payment Status: ${(invoice.payment_status || 'Paid').toUpperCase()}`, 115, y + 32);

  // Table Header
  y = 94;
  doc.setFillColor(...maroon);
  doc.rect(15, y, 180, 9, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text('#', 19, y + 6);
  doc.text('DESCRIPTION / SERVICE DETAILS', 28, y + 6);
  doc.text('QTY', 130, y + 6, { align: 'right' });
  doc.text('UNIT PRICE', 160, y + 6, { align: 'right' });
  doc.text('AMOUNT', 190, y + 6, { align: 'right' });

  // Table Rows
  y += 14;
  doc.setTextColor(...textDark);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);

  const items = invoice.items && invoice.items.length > 0 ? invoice.items : [{
    description: invoice.service_description || `${invoice.room_details || 'Accommodation / Pilgrimage Service'} (Booking ${invoice.booking_code})`,
    quantity: 1,
    unit_price: invoice.subtotal || invoice.total_amount,
    total: invoice.subtotal || invoice.total_amount
  }];

  items.forEach((item, idx) => {
    const descLines = doc.splitTextToSize(item.description, 95);
    doc.text(String(idx + 1), 19, y);
    doc.text(descLines, 28, y);
    doc.text(String(item.quantity || 1), 130, y, { align: 'right' });
    doc.text(`Rs. ${Number(item.unit_price || 0).toLocaleString('en-IN')}`, 160, y, { align: 'right' });
    doc.text(`Rs. ${Number(item.total || 0).toLocaleString('en-IN')}`, 190, y, { align: 'right' });

    const rowHeight = Math.max(8, descLines.length * 5 + 3);
    y += rowHeight;
    doc.setDrawColor(235, 235, 235);
    doc.line(15, y - 3, 195, y - 3);
  });

  // Totals Summary Box
  y += 8;
  const summaryX = 120;
  doc.setFontSize(9.5);
  doc.setTextColor(...textMuted);
  doc.text('Subtotal:', summaryX, y);
  doc.setTextColor(...textDark);
  doc.text(`Rs. ${Number(invoice.subtotal || 0).toLocaleString('en-IN')}`, 190, y, { align: 'right' });

  if (Number(invoice.discount) > 0) {
    y += 7;
    doc.setTextColor(...textMuted);
    doc.text('Discount:', summaryX, y);
    doc.setTextColor(16, 185, 129);
    doc.text(`- Rs. ${Number(invoice.discount).toLocaleString('en-IN')}`, 190, y, { align: 'right' });
  }

  if (Number(invoice.tax_amount) > 0) {
    y += 7;
    doc.setTextColor(...textMuted);
    doc.text('Taxes:', summaryX, y);
    doc.setTextColor(...textDark);
    doc.text(`Rs. ${Number(invoice.tax_amount).toLocaleString('en-IN')}`, 190, y, { align: 'right' });
  }

  y += 8;
  doc.setFillColor(...maroon);
  doc.roundedRect(summaryX - 5, y - 5, 80, 10, 2, 2, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.text('TOTAL AMOUNT:', summaryX, y + 1.5);
  doc.setTextColor(...yellow);
  doc.text(`Rs. ${Number(invoice.total_amount || 0).toLocaleString('en-IN')}`, 190, y + 1.5, { align: 'right' });

  // Payment Summary
  y += 14;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(16, 185, 129);
  doc.text('Amount Received:', summaryX, y);
  doc.text(`Rs. ${Number(invoice.amount_received || 0).toLocaleString('en-IN')}`, 190, y, { align: 'right' });

  y += 7;
  doc.setTextColor(Number(invoice.balance_due) > 0 ? 220 : 100, Number(invoice.balance_due) > 0 ? 38 : 116, Number(invoice.balance_due) > 0 ? 38 : 139);
  doc.text('Balance Due:', summaryX, y);
  doc.text(`Rs. ${Number(invoice.balance_due || 0).toLocaleString('en-IN')}`, 190, y, { align: 'right' });

  // Payment Verification Box on left
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(15, y - 34, 92, 34, 2, 2, 'FD');
  doc.setTextColor(...maroon);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.text('PAYMENT VERIFICATION DETAILS', 19, y - 27);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...textDark);
  doc.text(`Method: ${invoice.payment_method || 'Manual Transfer (UPI/Bank)'}`, 19, y - 20);
  doc.text(`Reference / UTR: ${invoice.transaction_reference || 'Verified Manually'}`, 19, y - 14);
  doc.text(`Status: ${invoice.payment_status || 'Verified'}`, 19, y - 8);

  // Terms & Notes
  y += 18;
  doc.setDrawColor(230, 210, 170);
  doc.line(15, y, 195, y);
  y += 6;
  doc.setTextColor(...maroon);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text('TERMS & IMPORTANT INFORMATION', 15, y);

  y += 5;
  doc.setTextColor(...textMuted);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  const termsLines = doc.splitTextToSize(org.terms, 180);
  doc.text(termsLines, 15, y);

  // Footer
  doc.setFillColor(...maroon);
  doc.rect(0, 285, 210, 12, 'F');
  doc.setTextColor(...yellow);
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'bold');
  doc.text('OM NAMAH SHIVAYA  •  ARUNACHALESHWARA TOURS & TRAVELS, TIRUVANNAMALAI', 105, 292, { align: 'center' });

  // Save PDF
  const fileName = `${invoice.invoice_number || 'Invoice'}_${(invoice.customer_name || 'Customer').replace(/\s+/g, '_')}.pdf`;
  doc.save(fileName);
}

window.generateInvoicePDF = generateInvoicePDF;

