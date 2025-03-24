import React, { useEffect } from "react";

const ABRInvoiceSampleAndCostDetails = ({
  setInvoiceData,
  invoiceData,
  ABRDetails,
}) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInvoiceData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (ABRDetails?.length) {
      setInvoiceData((prev) => ({
        ...prev,
        cost_components: ABRDetails[0]?.project?.project_samples?.map((abr) => ({
          name: abr?.target_group || "",
          sample: Number(abr?.sample) || 0,
          cpi: Number(abr?.cpi) || 0,
        })) || [],
      }));
    }
  }, [ABRDetails, setInvoiceData]);

  const totalProjectCost = ABRDetails[0]?.project?.project_samples?.reduce(
    (total, abr) => total + (Number(abr.sample) || 0) * (Number(abr.cpi) || 0),
    0
  );

  const advanceAmount = Number(ABRDetails[0]?.advance_invoice_amount) || 0;
  const finalPayment = totalProjectCost - advanceAmount;

  useEffect(() => {
    setInvoiceData((prev) => ({
      ...prev,
      totalCost: totalProjectCost?.toFixed(2),
      final_payment: finalPayment?.toFixed(2),
    }));
  }, [totalProjectCost, finalPayment, setInvoiceData]);

  return (
    <div className="pb-4 mb-4">
      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-3 py-1">Description</th>
            <th className="border px-3 py-1">Cost Components</th>
            <th className="border px-3 py-1">Sample</th>
            <th className="border px-3 py-1">CPI</th>
            <th className="border px-3 py-1">Total Costing (USD)</th>
          </tr>
        </thead>
        <tbody>
          {ABRDetails?.map((abr, abrIndex) => (
            <React.Fragment key={abrIndex}>
              {abr?.project?.project_samples?.map((item, index) => (
                <tr key={index}>
                  {index === 0 && (
                    <td
                      className="border p-2 align-top"
                      rowSpan={abr.project.project_samples.length}
                      style={{ verticalAlign: "top" }}
                    >
                      <input
                        type="text"
                        name="description"
                        onChange={handleInputChange}
                        className="w-full bg-white border p-2"
                        placeholder="Final Cost"
                      />
                    </td>
                  )}
                  <td className="border p-2">
                    <input
                      type="text"
                      name={`studyName_${index}`}
                      defaultValue={item?.target_group || ""}
                      onChange={handleInputChange}
                      className="w-full bg-white border p-2"
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      type="number"
                      name={`sample_${index}`}
                      defaultValue={item?.sample || 0}
                      onChange={handleInputChange}
                      className="w-full bg-white border p-2"
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      type="text"
                      name={`cpi_${index}`}
                      defaultValue={item?.cpi || 0}
                      onChange={handleInputChange}
                      className="w-full bg-white border p-2"
                    />
                  </td>
                  <td className="border p-2">
                    {`$${((item?.sample || 0) * (item?.cpi || 0)).toFixed(2)}`}
                  </td>
                </tr>
              ))}
            </React.Fragment>
          ))}

          <tr className="border">
            <td className="border p-2">Total Project Cost</td>
            <td colSpan="3"></td>
            <td className="border p-2">{`$${totalProjectCost?.toFixed(2)}`}</td>
          </tr>

          {invoiceData?.advanceType === "ABR" && (
            <tr className="border">
              <td className="border p-2">Less: Advance against Invoice</td>
              <td colSpan="3"></td>
              <td className="border p-2">{`$${advanceAmount?.toFixed(2)}`}</td>
            </tr>
          )}

          <tr className="border">
            <td className="border p-2">Final Payment</td>
            <td colSpan="3"></td>
            <td className="border p-2">{`$${finalPayment?.toFixed(2)}`}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ABRInvoiceSampleAndCostDetails;
