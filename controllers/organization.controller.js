import errorHandler from "../middleware/errorHandler.js";
import OrganizationModel from "../models/organization.model.js";

export const createOrg = async (req, res, next) => {
  const { name } = req.body;
  try {
    const orgName = await OrganizationModel.findOne({ name });
    if (orgName) {
      return next(errorHandler(409, "Organization is already exist."));
    }

    const newOrg = new OrganizationModel({ name });
    const savedOrg = await newOrg.save();

    return res.status(201).json({
      success: true,
      message: "Organization created successfully",
      organization: savedOrg,
    });
  } catch (error) {
    next(error);
  }
};

export const getOrg = async (req, res, next) => {
  const { orgId } = req.params;
  try {
    const org = await OrganizationModel.findById(orgId);

    if (!org) {
      return next(errorHandler(404, "Organization not found"));
    }

    return res.status(200).json({ success: true, organization: org });
  } catch (error) {
    next(error);
  }
};
