let kycData: any = {
  personalDetails: null,
  businessDetails: null,
  kycStatus: "not_submitted",
  rejectionReason: null,
  submittedAt: null
};

export const submitKyc = (data: any) => {
  const gstRegex =
    /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;

  if (!gstRegex.test(data.gstNumber)) {
    throw new Error("Invalid GST number");
  }

  kycData.personalDetails = {
    fullName: data.fullName,
    age: data.age,
    phoneNumber: data.phoneNumber
  };

  kycData.businessDetails = {
    companyName: data.companyName,
    gstNumber: data.gstNumber,
    companyAddress: data.companyAddress
  };

  kycData.kycStatus = "pending";
  kycData.rejectionReason = null;
  kycData.submittedAt = new Date();

  return kycData;
};

export const getKycStatus = () => kycData;

export const resubmitKyc = () => {
  kycData.kycStatus = "pending";
  kycData.rejectionReason = null;
  kycData.submittedAt = new Date();
  return kycData;
};

export const adminApprove = () => {
  kycData.kycStatus = "approved";
  kycData.rejectionReason = null;
  return kycData;
};

export const adminReject = (reason: string) => {
  kycData.kycStatus = "rejected";
  kycData.rejectionReason = reason;
  return kycData;
};
