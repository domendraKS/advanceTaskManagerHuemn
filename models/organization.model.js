import { model, Schema } from "mongoose";

const organizationSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const OrganizationModel = model("Organization", organizationSchema);

export default OrganizationModel;
