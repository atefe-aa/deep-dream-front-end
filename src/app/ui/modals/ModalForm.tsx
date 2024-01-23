type Props = {
  children: React.ReactNode;
  modalId: string;
  formik: any;
  isError: boolean;
  isLoading: boolean;
};

const ModalForm: React.FC<Props> = ({
  children,
  modalId,
  formik,
  isError,
  isLoading,
}) => {
  return (
    <>
      <form
        id={`${modalId}_form`}
        className="form"
        onSubmit={formik.handleSubmit}
        noValidate
      >
        {formik.status && (
          <div className="mb-lg-15 alert alert-danger">
            <div className="alert-text font-weight-bold">{formik.status}</div>
          </div>
        )}
        {/* begin::Scroll */}
        <div
          className="d-flex flex-column scroll-y me-n7 pe-7"
          id="kt_modal_add_user_scroll"
          data-kt-scroll="true"
          data-kt-scroll-activate="{default: false, lg: true}"
          data-kt-scroll-max-height="auto"
          data-kt-scroll-dependencies="#kt_modal_add_user_header"
          data-kt-scroll-wrappers="#kt_modal_add_user_scroll"
          data-kt-scroll-offset="300px"
        >
          {children}
        </div>
        {/* end::Scroll */}

        {/* begin::Actions */}
        <div className="text-center pt-15">
          <button
            type="reset"
            onClick={() => formik.resetForm()}
            className="btn btn-light me-3"
            data-kt-users-modal-action="cancel"
            disabled={formik.isSubmitting || isLoading}
          >
            Discard
          </button>

          <button
            type="submit"
            data-bs-dismiss={isError ? "modal" : ""}
            className="btn btn-primary"
            data-kt-users-modal-action="submit"
            disabled={
              formik.isSubmitting ||
              !formik.isValid ||
              !formik.touched ||
              isLoading
            }
          >
            {!isLoading && <span className="indicator-label">Submit</span>}
            {isLoading && (
              <span className="indicator-progress">
                Please wait...
                <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
              </span>
            )}
          </button>
        </div>
        {/* end::Actions */}
      </form>
    </>
  );
};

export { ModalForm };
