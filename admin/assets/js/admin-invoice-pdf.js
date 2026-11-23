/* ============================================================
   ARUNACHALESHWARA – In-App Visual Canvas & Branded PDF Invoice Generator (jsPDF)
   Supports In-App Canvas Customizations: Themes, Custom Text Colors,
   Add Custom Text Blocks in Any Required Size, Custom Header Banner,
   Transparent Background Watermark, Digital Signatures, Official Seals/Stamps,
   Dynamic Items & Terms. 100% In-App Processing (Zero external dependencies).
   ============================================================ */

function hexToRgb(hex, fallback = [69, 18, 14]) {
  if (!hex || typeof hex !== 'string') return fallback;
  hex = hex.replace('#', '').trim();
  if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
  const num = parseInt(hex, 16);
  if (isNaN(num)) return fallback;
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

function getLuminance(rgb) {
  if (!rgb || rgb.length < 3) return 0;
  return (0.299 * rgb[0] + 0.587 * rgb[1] + 0.114 * rgb[2]) / 255;
}

function getContrastColor(bgRgb, darkRgb = [69, 18, 14], lightRgb = [255, 255, 255]) {
  return getLuminance(bgRgb) > 0.55 ? darkRgb : lightRgb;
}

function formatPdfDate(dateStr) {
  if (typeof window.formatDate === 'function') {
    try { return window.formatDate(dateStr); } catch (_) {}
  }
  if (!dateStr) return 'N/A';
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return String(dateStr);
    return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  } catch (_) {
    return String(dateStr);
  }
}

// Renders either a custom uploaded stamp or an authentic vector seal onto an offscreen canvas with rotation
function renderStampToDataUrl(options) {
  return new Promise((resolve) => {
    try {
      const size = 300;
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');
      if (!ctx) return resolve(null);

      const rad = (Number(options.rotationDeg !== undefined ? options.rotationDeg : -12) * Math.PI) / 180;
      ctx.translate(size / 2, size / 2);
      ctx.rotate(rad);
      ctx.translate(-size / 2, -size / 2);

      if (options.customImage) {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
          ctx.drawImage(img, 15, 15, size - 30, size - 30);
          resolve(canvas.toDataURL('image/png'));
        };
        img.onerror = () => {
          console.warn('Custom stamp image failed to load, falling back to vector seal');
          drawVectorSeal(ctx, size, options.stampType);
          resolve(canvas.toDataURL('image/png'));
        };
        img.src = options.customImage;
        return;
      }

      drawVectorSeal(ctx, size, options.stampType);
      resolve(canvas.toDataURL('image/png'));
    } catch (e) {
      console.warn('renderStampToDataUrl error:', e);
      resolve(null);
    }
  });
}

function drawVectorSeal(ctx, size, stampType = 'paid') {
  ctx.save();
  if (stampType === 'paid') {
    // Green Paid Stamp
    ctx.strokeStyle = '#059669';
    ctx.lineWidth = 8;
    ctx.strokeRect(30, 70, size - 60, 160);
    ctx.lineWidth = 3;
    ctx.strokeRect(40, 80, size - 80, 140);

    ctx.fillStyle = '#059669';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = 'bold 36px Arial, Helvetica, sans-serif';
    ctx.fillText('★ PAID ★', size / 2, 125);
    ctx.font = 'bold 30px Arial, Helvetica, sans-serif';
    ctx.fillText('SETTLED', size / 2, 175);
  } else if (stampType === 'temple' || stampType === 'om') {
    // Temple Blessing Stamp
    ctx.strokeStyle = '#854D0E';
    ctx.lineWidth = 7;
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, 125, 0, Math.PI * 2);
    ctx.stroke();

    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, 112, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = '#854D0E';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = 'bold 22px Arial, Helvetica, sans-serif';
    ctx.fillText('OM NAMAH SHIVAYA', size / 2, 110);
    ctx.font = 'bold 32px Arial, Helvetica, sans-serif';
    ctx.fillText('॥ ॐ ॥', size / 2, 150);
    ctx.font = 'bold 18px Arial, Helvetica, sans-serif';
    ctx.fillText('TIRUVANNAMALAI', size / 2, 190);
  } else if (stampType === 'bank') {
    // Blue Bank Stamp
    ctx.strokeStyle = '#2563EB';
    ctx.lineWidth = 8;
    ctx.strokeRect(30, 70, size - 60, 160);
    ctx.lineWidth = 3;
    ctx.strokeRect(40, 80, size - 80, 140);

    ctx.fillStyle = '#2563EB';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = 'bold 32px Arial, Helvetica, sans-serif';
    ctx.fillText('VERIFIED', size / 2, 125);
    ctx.font = 'bold 26px Arial, Helvetica, sans-serif';
    ctx.fillText('OFFICIAL', size / 2, 175);
  } else {
    // Authorized Seal / Office
    ctx.strokeStyle = '#991B1B';
    ctx.lineWidth = 7;
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, 125, 0, Math.PI * 2);
    ctx.stroke();

    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, 112, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = '#991B1B';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = 'bold 26px Arial, Helvetica, sans-serif';
    ctx.fillText('AUTHORIZED', size / 2, 130);
    ctx.font = 'bold 22px Arial, Helvetica, sans-serif';
    ctx.fillText('OFFICE SEAL', size / 2, 170);
  }
  ctx.restore();
}

// Renders a multi-language (Unicode, Tamil, Sanskrit, English) Top Header Strip to PNG dataUrl
function renderTopStripToDataUrl(left, center, right, colorHex, fontSizePt) {
  try {
    const scale = 4;
    const w = 180 * scale; // 720 px
    const h = 7 * scale;   // 28 px
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    ctx.fillStyle = colorHex || '#45120E';
    ctx.textBaseline = 'middle';
    ctx.font = `bold ${Math.round(fontSizePt * scale * 1.05)}px Arial, Helvetica, sans-serif`;

    const midY = h / 2;
    if (left) {
      ctx.textAlign = 'left';
      ctx.fillText(left, 0, midY);
    }
    if (center) {
      ctx.textAlign = 'center';
      ctx.fillText(center, w / 2, midY);
    }
    if (right) {
      ctx.textAlign = 'right';
      ctx.fillText(right, w, midY);
    }

    return canvas.toDataURL('image/png');
  } catch (e) {
    console.warn('renderTopStripToDataUrl error:', e);
    return null;
  }
}

async function generateInvoicePDF(invoice, orgSettings = null) {
  if (typeof window.jspdf === 'undefined' || !window.jspdf.jsPDF) {
    alert('PDF library (jsPDF) is still loading. Please try again in a moment.');
    return;
  }

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

  // Organization branding fallback
  const org = Object.assign({
    org_name: 'ARUNACHALESHWARA TOURS & TRAVELS',
    tagline: 'Divine Pilgrimage & Hospitality Services',
    address: 'Avulpet Bypass, Near Arunachaleswarar Temple, Tiruvannamalai - 606601, Tamil Nadu',
    phone: '+91 90105 15341',
    email: 'arunachalaeswara2025@gmail.com',
    gstin: '',
    terms: '1. Check-in: 12:00 PM | Check-out: 11:00 AM.\n2. Please present a valid Govt. photo ID proof at check-in.\n3. Advance payments are non-refundable within 48 hours of check-in.\n4. Thank you for choosing Arunachaleswara Tours & Travels. Om Namah Shivaya.',
    logo_url: null,
    header_banner_url: null,
    stamp_url: null,
    custom_stamp_image: null,
    stamp_type: 'paid',
    show_stamp: true,
    stamp_rotation: -12,
    signature_url: null,
    background_image_url: null,
    background_opacity: 0.15,
    background_fit: 'cover',
    theme_color: '#45120E',
    accent_color: '#FFC908',
    header_top_left: '॥ ஸ்ரீ அருணாசலேஸ்வரர் துணை ॥',
    header_top_center: '॥ ॐ நமச்சிவாய ॥',
    header_top_right: 'DEVOTEE COPY',
    header_top_color: '#45120E',
    header_top_size: 8,
    header_text_color: '#FFFFFF',
    header_sub_color: '#FFC908',
    header_detail_color: '#EBEBEB',
    badge_text_color: '#FFC908',
    org_name_size: 17,
    footer_text: 'OM NAMAH SHIVAYA  •  ARUNACHALESHWARA TOURS & TRAVELS, TIRUVANNAMALAI',
    footer_text_color: '#FFC908',
    footer_text_size: 8.5,
    custom_text_blocks: []
  }, orgSettings || {}, invoice.custom_org || {});

  // Dynamic Theme Colors
  const themeHex = invoice.theme_color || org.theme_color || '#45120E';
  const accentHex = invoice.accent_color || org.accent_color || '#FFC908';
  const maroon = hexToRgb(themeHex, [69, 18, 14]);
  const yellow = hexToRgb(accentHex, [255, 201, 8]);
  const isBannerLight = getLuminance(maroon) > 0.55;

  const cream = [255, 249, 239];
  const textDark = [30, 41, 59];
  const textMuted = [100, 116, 139];

  // Text Color Overrides for Header with contrast protection
  const rawTitleColor = invoice.header_text_color || org.header_text_color || (isBannerLight ? '#45120E' : '#FFFFFF');
  let headerTextColor = hexToRgb(rawTitleColor, isBannerLight ? [69, 18, 14] : [255, 255, 255]);
  if (isBannerLight && getLuminance(headerTextColor) > 0.55) {
    headerTextColor = [69, 18, 14]; // Auto-contrast on light/yellow header
  }

  const rawSubColor = invoice.header_sub_color || org.header_sub_color || (isBannerLight ? '#45120E' : '#FFC908');
  let headerSubColor = hexToRgb(rawSubColor, isBannerLight ? [69, 18, 14] : yellow);
  if (isBannerLight && getLuminance(headerSubColor) > 0.55) {
    headerSubColor = [69, 18, 14]; // Auto-contrast on light/yellow header
  }

  const rawDetailColor = invoice.header_detail_color || org.header_detail_color || (isBannerLight ? '#1E293B' : '#EBEBEB');
  let headerDetailColor = hexToRgb(rawDetailColor, isBannerLight ? [30, 41, 59] : [235, 235, 235]);
  if (isBannerLight && getLuminance(headerDetailColor) > 0.55) {
    headerDetailColor = [30, 41, 59];
  }

  const rawBadgeColor = invoice.badge_text_color || org.badge_text_color || (isBannerLight ? '#45120E' : accentHex);
  let badgeTextColor = hexToRgb(rawBadgeColor, isBannerLight ? [69, 18, 14] : yellow);
  if (isBannerLight && getLuminance(badgeTextColor) > 0.55) {
    badgeTextColor = [69, 18, 14];
  }

  const orgNameFontSize = Math.min(24, Math.max(12, Number(invoice.org_name_size || org.org_name_size || 17)));

  // Images resolution: prioritize invoice-specific image if set, else org-level image
  const headerBanner = invoice.header_banner_url || org.header_banner_url || null;
  const logoImg = invoice.logo_url || org.logo_url || null;
  const stampImg = invoice.stamp_url || org.stamp_url || invoice.custom_stamp_image || org.custom_stamp_image || null;
  const stampType = invoice.stamp_type || org.stamp_type || 'paid';
  const showStamp = invoice.show_stamp !== false && org.show_stamp !== false;
  const stampRot = invoice.stamp_rotation !== undefined ? invoice.stamp_rotation : (org.stamp_rotation !== undefined ? org.stamp_rotation : -12);
  const signatureImg = invoice.signature_url || org.signature_url || null;
  const bgImg = invoice.background_image_url || org.background_image_url || null;
  const bgOpacity = Number(invoice.background_opacity !== undefined ? invoice.background_opacity : (org.background_opacity !== undefined ? org.background_opacity : 0.15));
  const bgFit = invoice.background_fit || org.background_fit || 'cover';

  // 0. TRANSPARENT BACKGROUND WATERMARK (RENDERED FIRST)
  if (bgImg) {
    try {
      if (doc.GState) {
        doc.saveGraphicsState();
        doc.setGState(new doc.GState({ opacity: bgOpacity }));
        if (bgFit === 'center') {
          doc.addImage(bgImg, 'JPEG', 45, 88, 120, 120);
        } else {
          doc.addImage(bgImg, 'JPEG', 0, 0, 210, 297);
        }
        doc.restoreGraphicsState();
      } else {
        if (bgFit === 'center') {
          doc.addImage(bgImg, 'JPEG', 45, 88, 120, 120);
        } else {
          doc.addImage(bgImg, 'JPEG', 0, 0, 210, 297);
        }
      }
    } catch (e) {
      console.warn('Background watermark render fallback:', e);
    }
  }

  // Top Header Strip text (Above Main Heading: Left, Middle, Right)
  const headerTopLeft = (invoice.header_top_left !== undefined ? invoice.header_top_left : org.header_top_left) || '';
  const headerTopCenter = (invoice.header_top_center !== undefined ? invoice.header_top_center : org.header_top_center) || '';
  const headerTopRight = (invoice.header_top_right !== undefined ? invoice.header_top_right : org.header_top_right) || '';
  const hasTopStrip = Boolean(headerTopLeft.trim() || headerTopCenter.trim() || headerTopRight.trim());
  const topStripHeight = hasTopStrip ? 6.5 : 0;

  // 1. TOP HEADER BANNER (SUPPORTS DYNAMIC HEADER HEIGHT WITH USER TEXT)
  const headerBlocks = (invoice.custom_text_blocks || org.custom_text_blocks || []).filter(b => b.target === 'header');
  const headerExtra = (headerBlocks.length > 0 ? (headerBlocks.length * 4.5) : 0) + topStripHeight;
  const headerBaseHeight = 38;
  const headerTotalHeight = headerBaseHeight + headerExtra;

  let headerRendered = false;
  if (headerBanner) {
    try {
      doc.addImage(headerBanner, 'JPEG', 0, 0, 210, headerTotalHeight);
      headerRendered = true;
    } catch (e) {
      console.warn('Custom banner render failed, fallback to default banner:', e);
    }
  }

  if (!headerRendered) {
    // Default Themed Banner Bar
    doc.setFillColor(...maroon);
    doc.rect(0, 0, 210, headerTotalHeight, 'F');
  }

  // Accent Gold Line Under Header
  doc.setFillColor(...yellow);
  doc.rect(0, headerTotalHeight, 210, 2.5, 'F');

  // If header banner was NOT an all-in-one graphic, draw text and logo
  if (!headerBanner) {
    // Top Header Strip (Above Main Heading: Left, Middle, Right)
    if (hasTopStrip) {
      const rawTopColor = invoice.header_top_color || org.header_top_color || (isBannerLight ? '#45120E' : '#FFC908');
      let topColor = hexToRgb(rawTopColor, isBannerLight ? [69, 18, 14] : yellow);
      if (isBannerLight && getLuminance(topColor) > 0.55) {
        topColor = [69, 18, 14];
      }
      const topFontSize = Number(invoice.header_top_size || org.header_top_size || 7.5);
      const combinedText = `${headerTopLeft} ${headerTopCenter} ${headerTopRight}`;
      const hasUnicode = /[^\u0000-\u00FF]/.test(combinedText);

      if (hasUnicode) {
        const topHex = `#${topColor.map(x => x.toString(16).padStart(2, '0')).join('')}`;
        const topStripDataUrl = renderTopStripToDataUrl(headerTopLeft.trim(), headerTopCenter.trim(), headerTopRight.trim(), topHex, topFontSize);
        if (topStripDataUrl) {
          doc.addImage(topStripDataUrl, 'PNG', 15, 3.2, 180, 5.5);
        }
      } else {
        doc.setTextColor(...topColor);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(topFontSize);
        if (headerTopLeft.trim()) doc.text(headerTopLeft.trim(), 15, 6.5, { align: 'left' });
        if (headerTopCenter.trim()) doc.text(headerTopCenter.trim(), 105, 6.5, { align: 'center' });
        if (headerTopRight.trim()) doc.text(headerTopRight.trim(), 195, 6.5, { align: 'right' });
      }

      // Subtle divider under top header strip
      doc.setDrawColor(...(isBannerLight ? [215, 185, 45] : [110, 35, 28]));
      doc.setLineWidth(0.2);
      doc.line(15, 8.8, 195, 8.8);
    }

    const titleOffsetY = hasTopStrip ? 5.5 : 0;
    let titleX = 15;

    // Optional Logo on left
    if (logoImg) {
      try {
        doc.addImage(logoImg, 'PNG', 15, 6 + titleOffsetY, 26, 26);
        titleX = 45;
      } catch (e) {
        console.warn('Logo image render failed:', e);
      }
    }

    // Brand Title (Custom Text Color & Custom Size)
    doc.setTextColor(...headerTextColor);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(orgNameFontSize);
    doc.text(org.org_name, titleX, 15 + titleOffsetY);

    // Tagline (Custom Sub Color)
    doc.setTextColor(...headerSubColor);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text(org.tagline, titleX, 21 + titleOffsetY);

    // Address & Contact (Custom Detail Color)
    doc.setTextColor(...headerDetailColor);
    doc.setFontSize(8);
    doc.text(org.address, titleX, 27 + titleOffsetY);
    doc.text(`Phone: ${org.phone}  |  Email: ${org.email}` + (org.gstin ? `  |  GSTIN: ${org.gstin}` : ''), titleX, 32 + titleOffsetY);

    // Custom Header Text Blocks Added by User
    if (headerBlocks.length > 0) {
      let curHY = 36.5 + titleOffsetY;
      headerBlocks.forEach(hb => {
        if (!hb.text || !hb.text.trim()) return;
        let hbColor = hexToRgb(hb.color || (isBannerLight ? '#45120E' : '#FFC908'), isBannerLight ? [69, 18, 14] : yellow);
        if (isBannerLight && getLuminance(hbColor) > 0.55) {
          hbColor = [69, 18, 14];
        }
        doc.setTextColor(...hbColor);
        doc.setFont('helvetica', hb.bold ? 'bold' : 'normal');
        doc.setFontSize(Number(hb.size ? Math.min(hb.size * 0.7, 10) : 7.5));
        const align = hb.align || 'left';
        const hx = align === 'center' ? 105 : align === 'right' ? 195 : titleX;
        doc.text(hb.text, hx, curHY, { align: align });
        curHY += 4.5;
      });
    }

    // Invoice Title Badge on Right (Custom Badge Text Color)
    doc.setTextColor(...badgeTextColor);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.text(invoice.title_badge || 'INVOICE', 195, 19 + titleOffsetY, { align: 'right' });

    doc.setTextColor(...headerTextColor);
    doc.setFontSize(9.5);
    doc.text(invoice.invoice_number || 'ARN-INV-2026-00001', 195, 26 + titleOffsetY, { align: 'right' });
    doc.setTextColor(...headerDetailColor);
    doc.setFontSize(8.5);
    doc.text(`Date: ${formatPdfDate(invoice.invoice_date)}`, 195, 32 + titleOffsetY, { align: 'right' });
  }

  // 2. CUSTOMER & BOOKING INFO BOX
  let y = 48 + headerExtra;
  doc.setFillColor(...cream);
  doc.setDrawColor(230, 210, 170);
  doc.roundedRect(15, y, 180, 36, 3, 3, 'FD');

  // Left: Bill To
  doc.setTextColor(...(isBannerLight ? [69, 18, 14] : maroon));
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
  if (invoice.customer_address) {
    doc.text(`Address: ${invoice.customer_address}`, 20, y + 31);
  }

  // Right: Booking Metadata
  doc.setTextColor(...(isBannerLight ? [69, 18, 14] : maroon));
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text('BOOKING REFERENCE', 115, y + 7);

  doc.setTextColor(...textDark);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.text(`Booking ID: ${invoice.booking_code || 'N/A'}`, 115, y + 14);
  if (invoice.room_details) {
    const roomText = doc.splitTextToSize(`Room / Service: ${invoice.room_details}`, 75);
    doc.text(roomText, 115, y + 20);
  }
  if (invoice.check_in && invoice.check_out) {
    doc.text(`Stay: ${formatPdfDate(invoice.check_in)} to ${formatPdfDate(invoice.check_out)}`, 115, y + 26);
  }
  doc.text(`Payment Status: ${(invoice.payment_status || 'Paid').toUpperCase()}`, 115, y + 32);

  // 3. TABLE HEADER (WITH AUTOMATIC CONTRAST PROTECTION)
  y = 94;
  doc.setFillColor(...maroon);
  doc.rect(15, y, 180, 9, 'F');
  const tableHeaderTextColor = getContrastColor(maroon, [69, 18, 14], [255, 255, 255]);
  doc.setTextColor(...tableHeaderTextColor);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text('#', 19, y + 6);
  doc.text('DESCRIPTION / SERVICE DETAILS', 28, y + 6);
  doc.text('QTY', 130, y + 6, { align: 'right' });
  doc.text('UNIT PRICE', 160, y + 6, { align: 'right' });
  doc.text('AMOUNT', 190, y + 6, { align: 'right' });

  // 4. TABLE ROWS
  y += 14;
  doc.setTextColor(...textDark);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);

  const items = (invoice.items && invoice.items.length > 0) ? invoice.items : [{
    description: invoice.service_description || `${invoice.room_details || 'Accommodation / Pilgrimage Service'} (Booking ${invoice.booking_code})`,
    quantity: 1,
    unit_price: invoice.subtotal || invoice.total_amount,
    total: invoice.subtotal || invoice.total_amount
  }];

  items.forEach((item, idx) => {
    const descLines = doc.splitTextToSize(item.description || 'Service', 95);
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

  // 5. TOTALS SUMMARY BOX (WITH AUTOMATIC CONTRAST PROTECTION)
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
    doc.text('Taxes / GST:', summaryX, y);
    doc.setTextColor(...textDark);
    doc.text(`Rs. ${Number(invoice.tax_amount).toLocaleString('en-IN')}`, 190, y, { align: 'right' });
  }

  y += 8;
  doc.setFillColor(...maroon);
  doc.roundedRect(summaryX - 5, y - 5, 80, 10, 2, 2, 'F');
  const totalBoxTextColor = getContrastColor(maroon, [69, 18, 14], [255, 255, 255]);
  doc.setTextColor(...totalBoxTextColor);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.text('TOTAL AMOUNT:', summaryX, y + 1.5);

  const totalAmountColor = isBannerLight ? [69, 18, 14] : yellow;
  doc.setTextColor(...totalAmountColor);
  doc.text(`Rs. ${Number(invoice.total_amount || 0).toLocaleString('en-IN')}`, 190, y + 1.5, { align: 'right' });

  // Payment Summary
  y += 14;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(16, 185, 129);
  doc.text('Amount Received:', summaryX, y);
  doc.text(`Rs. ${Number(invoice.amount_received || 0).toLocaleString('en-IN')}`, 190, y, { align: 'right' });

  y += 7;
  const hasBalance = Number(invoice.balance_due) > 0;
  doc.setTextColor(hasBalance ? 220 : 100, hasBalance ? 38 : 116, hasBalance ? 38 : 139);
  doc.text('Balance Due:', summaryX, y);
  doc.text(`Rs. ${Number(invoice.balance_due || 0).toLocaleString('en-IN')}`, 190, y, { align: 'right' });

  // 6. PAYMENT VERIFICATION BOX (ON LEFT)
  const boxTop = y - 34;
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(15, boxTop, 92, 34, 2, 2, 'FD');
  doc.setTextColor(...(isBannerLight ? [69, 18, 14] : maroon));
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.text('PAYMENT VERIFICATION DETAILS', 19, boxTop + 7);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...textDark);
  doc.text(`Method: ${invoice.payment_method || 'Manual Transfer (UPI/Bank)'}`, 19, boxTop + 14);
  doc.text(`Reference / UTR: ${invoice.transaction_reference || 'Verified Manually'}`, 19, boxTop + 20);
  doc.text(`Status: ${invoice.payment_status || 'Verified'}`, 19, boxTop + 26);

  // OFFICIAL SEAL / STAMP RENDERING (CUSTOM OR BUILT-IN VECTOR)
  if (showStamp) {
    try {
      const stampDataUrl = await renderStampToDataUrl({
        customImage: stampImg,
        stampType: stampType,
        rotationDeg: stampRot
      });
      if (stampDataUrl) {
        doc.addImage(stampDataUrl, 'PNG', 75, boxTop + 2, 30, 30);
      }
    } catch (e) {
      console.warn('Stamp rendering error in jsPDF:', e);
    }
  }

  // Optional Drawn Digital Signature
  if (signatureImg) {
    try {
      doc.addImage(signatureImg, 'PNG', 148, y - 2, 42, 16);
      doc.setFontSize(7);
      doc.setTextColor(...textMuted);
      doc.text('Authorized Signatory', 169, y + 17, { align: 'center' });
    } catch (e) {
      console.warn('Signature render failed:', e);
    }
  }

  // 6.5. RENDER ANY CUSTOM TEXT BLOCKS ADDED BY USER (IN BODY)
  const bodyBlocks = (invoice.custom_text_blocks || org.custom_text_blocks || []).filter(b => !b.target || b.target === 'body');
  if (bodyBlocks && bodyBlocks.length > 0) {
    y += 16;
    bodyBlocks.forEach(tb => {
      if (!tb.text || !tb.text.trim()) return;
      const bColor = hexToRgb(tb.color || '#1e293b', textDark);
      doc.setTextColor(...bColor);
      doc.setFont('helvetica', tb.bold ? 'bold' : 'normal');
      doc.setFontSize(Number(tb.size || 9.5));
      const align = tb.align || 'left';
      const xPos = align === 'center' ? 105 : align === 'right' ? 195 : 15;
      const textLines = doc.splitTextToSize(tb.text, 180);
      doc.text(textLines, xPos, y, { align: align });
      y += (textLines.length * (Number(tb.size || 9.5) * 0.45)) + 3;
    });
  } else {
    y += 20;
  }

  // 7. TERMS & NOTES
  doc.setDrawColor(230, 210, 170);
  doc.line(15, y, 195, y);
  y += 6;
  doc.setTextColor(...(isBannerLight ? [69, 18, 14] : maroon));
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text('TERMS & IMPORTANT INFORMATION', 15, y);

  y += 5;
  doc.setTextColor(...textMuted);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  const termsText = invoice.notes || org.terms || 'Om Namah Shivaya.';
  const termsLines = doc.splitTextToSize(termsText, 180);
  doc.text(termsLines, 15, y);

  // 8. FOOTER (WITH CUSTOM FOOTER TEXT & CUSTOM FOOTER LINES & CONTRAST PROTECTION)
  const footerBlocks = (invoice.custom_text_blocks || org.custom_text_blocks || []).filter(b => b.target === 'footer');
  const footerBaseHeight = 12;
  const footerExtraHeight = footerBlocks.length * 4.5;
  const footerTotalHeight = footerBaseHeight + footerExtraHeight;
  const footerY = 297 - footerTotalHeight;

  doc.setFillColor(...maroon);
  doc.rect(0, footerY, 210, footerTotalHeight, 'F');

  const customFooterText = invoice.footer_text || org.footer_text || 'OM NAMAH SHIVAYA  •  ARUNACHALESHWARA TOURS & TRAVELS, TIRUVANNAMALAI';
  const rawFooterColor = invoice.footer_text_color || org.footer_text_color || (isBannerLight ? '#45120E' : '#FFC908');
  let customFooterColor = hexToRgb(rawFooterColor, isBannerLight ? [69, 18, 14] : yellow);
  if (isBannerLight && getLuminance(customFooterColor) > 0.55) {
    customFooterColor = [69, 18, 14];
  }

  const customFooterSize = Number(invoice.footer_text_size || org.footer_text_size || 8.5);

  doc.setTextColor(...customFooterColor);
  doc.setFontSize(customFooterSize);
  doc.setFont('helvetica', 'bold');
  doc.text(customFooterText, 105, footerY + 6.5, { align: 'center' });

  if (footerBlocks.length > 0) {
    let curFY = footerY + 11;
    footerBlocks.forEach(fb => {
      if (!fb.text || !fb.text.trim()) return;
      let fbColor = hexToRgb(fb.color || (isBannerLight ? '#45120E' : '#FFFFFF'), isBannerLight ? [69, 18, 14] : [255, 255, 255]);
      if (isBannerLight && getLuminance(fbColor) > 0.55) {
        fbColor = [69, 18, 14];
      }
      doc.setTextColor(...fbColor);
      doc.setFont('helvetica', fb.bold ? 'bold' : 'normal');
      doc.setFontSize(Number(fb.size ? Math.min(fb.size * 0.7, 9) : 7.5));
      const falign = fb.align || 'center';
      const fx = falign === 'left' ? 15 : falign === 'right' ? 195 : 105;
      doc.text(fb.text, fx, curFY, { align: falign });
      curFY += 4.5;
    });
  }

  // Save PDF
  const fileName = `${invoice.invoice_number || 'Invoice'}_${(invoice.customer_name || 'Customer').replace(/\s+/g, '_')}.pdf`;
  doc.save(fileName);
}

window.generateInvoicePDF = generateInvoicePDF;
