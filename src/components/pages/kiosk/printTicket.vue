<template>
  <div>
    <table style="width:430px;background:#FFF;color:#000;margin:0 auto;border:1px solid;">
      <tr>
        <td
          colspan="3"
          style="text-align:center;font-size:13px;padding:15px 5px 15px 5px;border-bottom:1px solid #D3D3D3;"
        >
          <span style="display:block">Empire Cinemas - Gizan</span>
          <span style="display:block">Bright Minds For Education Co.</span>
          <span style="display:block">شركة برايت مايندز للتعليم</span>
          <span style="display:block">Al Rashid Mall</span>
          <span style="display:block">Prince Mohammad Bin Naser Road</span>
          <span style="display:block">Jazan - 82723 Saudi Arbia</span>
        </td>
      </tr>

      <tr>
        <td colspan="3" style="font-size:14px;padding:15px 5px 10px 15px;">
          <span>Theatre :&nbsp;</span>
          <span style="font-weight:bold">SCREEN 10</span>

          <span style="padding-left:40px;">Rating</span>
          <span style="font-weight:bold">R12</span>
        </td>
      </tr>
      <tr>
        <td colspan="3" style="padding:5px 5px 20px 15px;vertical-align:top;">
          <span style="font-size:14px;">Movie:&nbsp;</span>
          <span style="font-size:14px;font-weight:bold;">Black Water</span>
          <span style="font-size:14px;padding-left:45px;display:block;">انجل هاز فولين (الانجليزية)</span>
        </td>
      </tr>
      <tr style="text-align:center">
        <td style="width:33.33%;vertical-align:top;padding-bottom:20px">
          <span style="display:block;font-size:14px">Transaction ID</span>
          <span style="display:block;font-weight:bold;font-size:13px;">1235</span>
        </td>
        <td style="width:33.33%;padding-bottom:15px">
          <span style="display:block;font-size:14px">Date</span>
          <span style="display:block;font-weight:bold;font-size:13px;">27-01-2019</span>
        </td>
        <td style="width:33.33%;padding-bottom:15px">
          <span style="display:block;font-size:14px">Time</span>
          <span style="display:block;font-weight:bold;font-size:13px;">06:00PM</span>
        </td>
      </tr>
      <tr style="text-align:center;">
        <td style="width:33.33%;vertical-align:top;">
          <span style="display:block;font-size:14px">Class</span>
          <span style="display:block;font-size:14px">نوع المقعد</span>
          <span style="display:block;font-weight:bold;font-size:13px;">Standard</span>
        </td>
        <td style="width:33.33%;vertical-align:top;">
          <span style="display:block;font-size:14px">Seat</span>
          <span style="display:block;font-size:14px">المقعد</span>
          <span style="display:block;font-weight:bold;font-size:13px;">J-1, J-2, J-3, J-4, J-5, J-6</span>
        </td>
        <td style="width:33.33%;vertical-align:top;">
          <span style="display:block;font-size:14px">Ticket Qty</span>
          <span style="display:block;font-size:14px">عدد التذاكر</span>
          <span style="display:block;font-weight:bold;font-size:13px;">5</span>
        </td>
      </tr>
      <!-- SHOW THIS TR ONLY IF 3D IS SELECTED -->
      <tr>
        <td style="font-size:14px;padding:5px 5px 10px 5px;text-align:center">3D Glass</td>
        <td style="padding-bottom:10px;"></td>
        <td style="font-size:14px;text-align:center;font-weight:bold;padding-bottom:10px;">5</td>
      </tr>
      <tr style="text-align:center;">
        <td style="width:33.33%;vertical-align:top;padding-bottom:15px;padding-top:10px;">
          <span style="display:block;font-size:14px">Base Amount</span>
          <span style="display:block;font-size:14px">المبلغ من دون الضريبة</span>
          <span style="display:block;font-weight:bold;font-size:13px;">250</span>
        </td>
        <td style="width:33.33%;vertical-align:top;padding-bottom:15px;padding-top:10px;">
          <span style="display:block;font-size:11px;margin-bottom:2px;">Added Value Tax:</span>
          <span style="display:block;font-size:14px">ضريبة القيمة المضافة</span>
          <span style="display:block;font-weight:bold;font-size:13px;">12.65</span>
        </td>
        <td style="width:33.33%;vertical-align:top;padding-bottom:15px;padding-top:10px;">
          <span style="display:block;font-size:14px">Total</span>
          <span style="display:block;font-size:14px">المحموع</span>
          <span style="display:block;font-weight:bold;font-size:13px;">262</span>
        </td>
      </tr>
      <tr>
        <td colspan="3" style="font-size:14px;padding:5px 5px 0 15px;">
          <span>VAT is charged at 5%</span>
          <span style="padding-left:10px;">12.65</span>
        </td>
      </tr>
      <tr>
        <td colspan="3" style="font-size:14px;padding:0px 5px 10px 15px;">
          <span>ضريبة القيمة المضافة 5%</span>
        </td>
      </tr>
      <tr>
        <td colspan="3" style="font-size:14px;padding:5px 5px 0px 15px;">
          <span>VAT Numbers:</span>
          <span style="padding-left:10px;">301234514500003</span>
        </td>
      </tr>
      <tr>
        <td colspan="3" style="font-size:14px;padding:0px 5px 10px 15px;">
          <span>الرقم الضريبي</span>
        </td>
      </tr>
      <tr>
        <td colspan="3" style="padding:5px 5px 5px 15px;font-size:14px">
          <span style="display:block;">Empire Cinemas - Gizan-82723 Saudi Arbia</span>
          <span style="display:block;">Sales Info</span>
          <span>IT-Showbizz</span>
          <span style="padding-left:45px">03:45 PM</span>
        </td>
      </tr>
      <tr style="text-align:center">
        <td style="vertical-align:top;padding-bottom:10px;">
          <span style="display:block;font-size:14px">Invoice No:</span>
          <span style="display:block;font-size:14px">رقم الفاتورة</span>
          <span style="display:block;font-size:14px;padding-top:5px">0000000000001</span>
        </td>
        <td style="vertical-align:top;padding-bottom:10px;">
          <span style="display:block;font-size:14px">Date</span>
          <span style="display:block;font-size:14px">تاريخ</span>
          <span style="display:block;font-size:14px;padding-top:5px">27/10/2019</span>
        </td>
        <td style="vertical-align:top;padding-bottom:10px;">
          <span style="display:block;font-size:14px">Time</span>
          <span style="display:block;font-size:14px">زمن</span>
          <span style="display:block;font-size:14px;padding-top:5px">3:30PM</span>
        </td>
      </tr>
    </table>
  </div>
</template>
<style>
</style>