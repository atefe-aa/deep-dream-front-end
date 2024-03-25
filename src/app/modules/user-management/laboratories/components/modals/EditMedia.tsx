import { FC, useEffect } from "react";

import { useState } from "react";
import * as Yup from "yup";
import clsx from "clsx";
import { useFormik } from "formik";
import { ModalLayout } from "../../../../../ui/modals/ModalLayout";
import { ModalForm } from "../../../../../ui/modals/ModalForm";
import { toAbsoluteUrl } from "../../../../../../_metronic/helpers";
import { LabsModel } from "../../core/_models";
import { useUpdateMedia } from "../../hooks/useUpdateMedia";
import { useCloseModalOnSuccess } from "../../../../hooks/useCloseModalOnSuccess";

const addSchema = Yup.object().shape({});

type Props = {
  labData: LabsModel;
};

const EditMedia: FC<Props> = ({ labData }) => {
  const initialValues = {
    avatar: labData.avatar || (undefined as File | undefined),
    signature: labData.signature || (undefined as File | undefined),
    header: labData.header || (undefined as File | undefined),
    footer: labData.footer || (undefined as File | undefined),
  };

  const { updateMedia, isPending, error, data } = useUpdateMedia();

  const blankAvatar = toAbsoluteUrl("/media/svg/avatars/blank.svg");
  const blankImg = toAbsoluteUrl("/media/svg/files/blank-image.svg");

  const formik = useFormik({
    initialValues,
    validationSchema: addSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      if (error?.message) {
        setStatus(error.message);
      }
      try {
        updateMedia([labData.id, values]);
      } catch (error) {
        console.error(error);
        setStatus(error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    // Update formik initialValues whenever counsellorData changes
    formik.setValues({
      avatar: labData.avatar || (undefined as File | undefined),
      signature: labData.signature || (undefined as File | undefined),
      header: labData.header || (undefined as File | undefined),
      footer: labData.footer || (undefined as File | undefined),
    });
  }, [labData]);

  useCloseModalOnSuccess(`edit_media${labData.id}`, data, formik);
  return (
    <ModalLayout
      modalId={`edit_media${labData.id}`}
      title="Update laboratory media"
    >
      <ModalForm
        modalId={`edit_media${labData.id}`}
        formik={formik}
        isError={Boolean(error)}
        isLoading={isPending}
      >
        {/* begin::Hint */}
        <div>Allowed file types: png, jpg, jpeg.</div>
        <span className="fs-7 text-muted mb-8">
          Recommendation: The image ratio for avatar and signature is better to
          be 1:1 and for header and footer is better to be 10:1
        </span>
        {/* end::Hint */}
        <div className="d-flex justify-content-between">
          {/* begin::Avatar Input group */}
          <div className="d-flex justify-content-between align-items-center fv-row mb-7">
            {/* begin::Label */}
            <label className="fw-bold fs-7 p-2 me-1 rounded bg-light-info mb-2">
              Avatar
            </label>
            {/* end::Label */}

            {/* begin::Image input */}
            <div
              className="image-input image-input-outline"
              data-kt-image-input="true"
              style={{ backgroundImage: `url('${blankAvatar}')` }}
            >
              {/* begin::Preview existing avatar */}
              <img
                src={
                  formik.values.avatar instanceof File
                    ? URL.createObjectURL(formik.values.avatar)
                    : formik.values.avatar || blankImg
                }
                alt="Avatar Preview"
                className="image-input-wrapper w-125px h-125px"
              />
              {/* end::Preview existing avatar */}

              {/* begin::Label */}
              <label
                className="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow"
                data-kt-image-input-action="change"
                data-bs-toggle="tooltip"
                title="Change avatar"
              >
                <i className="bi bi-pencil-fill fs-7"></i>

                <input
                  type="file"
                  name="avatar"
                  accept=".png, .jpg, .jpeg"
                  onChange={(event) => {
                    const file = event.currentTarget.files?.[0];
                    if (file) {
                      formik.setFieldValue("avatar", file);
                    }
                  }}
                />
                <input type="hidden" name="avatar_remove" />
              </label>
              {/* end::Label */}

              {/* begin::Remove */}
              <span
                className="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow"
                data-kt-image-input-action="remove"
                data-bs-toggle="tooltip"
                title="Remove avatar"
                onClick={() => {
                  formik.setFieldValue("avatar", undefined);
                }}
              >
                <i className="bi bi-x fs-2"></i>
              </span>
              {/* end::Remove */}
            </div>

            {/* end::Image input */}
          </div>
          {/* end::Input group */}

          {/* begin:: signature Input group */}
          <div className="d-flex justify-content-between align-items-center fv-row mb-7">
            {/* begin::Label */}

            <label className=" fw-bold fs-7 p-2 me-1 rounded bg-light-info mb-2">
              Signature
            </label>

            {/* end::Label */}

            {/* begin::Image input */}
            <div
              className="image-input image-input-outline"
              data-kt-image-input="true"
              style={{ backgroundImage: `url('${blankImg}')` }}
            >
              {/* begin::Preview existing signature */}
              <img
                src={
                  formik.values.signature instanceof File
                    ? URL.createObjectURL(formik.values.signature)
                    : formik.values.signature || blankImg
                }
                alt="signature Preview"
                className="image-input-wrapper w-125px h-125px"
              />
              {/* end::Preview existing signature */}

              {/* begin::Label */}
              <label
                className="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow"
                data-kt-image-input-action="change"
                data-bs-toggle="tooltip"
                title="Change signature"
              >
                <i className="bi bi-pencil-fill fs-7"></i>

                <input
                  type="file"
                  name="signature"
                  accept=".png, .jpg, .jpeg"
                  onChange={(event) => {
                    const file = event.currentTarget.files?.[0];
                    if (file) {
                      formik.setFieldValue("signature", file);
                    }
                  }}
                />
                <input type="hidden" name="signature_remove" />
              </label>
              {/* end::Label */}

              {/* begin::Remove */}
              <span
                className="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow"
                data-kt-image-input-action="remove"
                data-bs-toggle="tooltip"
                title="Remove signature"
                onClick={() => {
                  formik.setFieldValue("signature", undefined);
                }}
              >
                <i className="bi bi-x fs-2"></i>
              </span>
              {/* end::Remove */}
            </div>
            {/* end::Image input */}
          </div>
          {/* end::Input group */}
        </div>

        {/* begin:: header Input group */}
        <div className="d-flex justify-content-between align-items-center fv-row mb-7">
          {/* begin::Label */}
          <label className=" fw-bold fs-7 p-2 me-1 rounded bg-light-info mb-2">
            Header
          </label>
          {/* end::Label */}

          {/* begin::Image input */}
          <div
            className="image-input image-input-outline"
            data-kt-image-input="true"
            style={{ backgroundImage: `url('${blankImg}')` }}
          >
            {/* begin::Preview existing header */}
            <img
              src={
                formik.values.header instanceof File
                  ? URL.createObjectURL(formik.values.header)
                  : formik.values.header || blankImg
              }
              alt="header Preview"
              className="image-input-wrapper w-500px h-50px"
            />
            {/* end::Preview existing header */}

            {/* begin::Label */}
            <label
              className="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow"
              data-kt-image-input-action="change"
              data-bs-toggle="tooltip"
              title="Change header"
            >
              <i className="bi bi-pencil-fill fs-7"></i>

              <input
                type="file"
                name="header"
                accept=".png, .jpg, .jpeg"
                onChange={(event) => {
                  const file = event.currentTarget.files?.[0];
                  if (file) {
                    formik.setFieldValue("header", file);
                  }
                }}
              />
              <input type="hidden" name="header_remove" />
            </label>
            {/* end::Label */}

            {/* begin::Remove */}
            <span
              className="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow"
              data-kt-image-input-action="remove"
              data-bs-toggle="tooltip"
              title="Remove header"
              onClick={() => {
                formik.setFieldValue("header", undefined);
              }}
            >
              <i className="bi bi-x fs-2"></i>
            </span>
            {/* end::Remove */}
          </div>
          {/* end::Image input */}
        </div>
        {/* end::Input group */}

        {/* begin:: footer Input group */}
        <div className="d-flex justify-content-between align-items-center fv-row mb-7">
          {/* begin::Label */}
          <label className="fw-bold fs-7 p-2 me-1 rounded bg-light-info mb-2">
            Footer
          </label>
          {/* end::Label */}

          {/* begin::Image input */}
          <div
            className="image-input image-input-outline"
            data-kt-image-input="true"
            style={{ backgroundImage: `url('${blankImg}')` }}
          >
            {/* begin::Preview existing footer */}
            <img
              src={
                formik.values.footer instanceof File
                  ? URL.createObjectURL(formik.values.footer)
                  : formik.values.footer || blankImg
              }
              alt="footer Preview"
              className="image-input-wrapper  w-500px h-50px"
            />
            {/* end::Preview existing footer */}

            {/* begin::Label */}
            <label
              className="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow"
              data-kt-image-input-action="change"
              data-bs-toggle="tooltip"
              title="Change footer"
            >
              <i className="bi bi-pencil-fill fs-7"></i>

              <input
                type="file"
                name="footer"
                accept=".png, .jpg, .jpeg"
                onChange={(event) => {
                  const file = event.currentTarget.files?.[0];
                  if (file) {
                    formik.setFieldValue("footer", file);
                  }
                }}
              />
              <input type="hidden" name="footer_remove" />
            </label>
            {/* end::Label */}

            {/* begin::Cancel */}
            <span
              className="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow"
              data-kt-image-input-action="cancel"
              data-bs-toggle="tooltip"
              title="Cancel footer"
              onClick={() => {
                formik.setFieldValue("footer", undefined);
              }}
            >
              <i className="bi bi-x fs-2"></i>
            </span>
            {/* end::Cancel */}

            {/* begin::Remove */}
            <span
              className="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow"
              data-kt-image-input-action="remove"
              data-bs-toggle="tooltip"
              title="Remove avatar"
              onClick={() => {
                formik.setFieldValue("footer", undefined);
              }}
            >
              <i className="bi bi-x fs-2"></i>
            </span>
            {/* end::Remove */}
          </div>
          {/* end::Image input */}
        </div>
        {/* end::Input group */}
      </ModalForm>
    </ModalLayout>
  );
};

export { EditMedia };
