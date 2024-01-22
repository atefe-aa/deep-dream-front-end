const NoRecordRow = () => {
  return (
    <tr>
      <td colSpan={20}>
        <div className="d-flex text-center w-100 align-content-center justify-content-center">
          No matching records found
        </div>
      </td>
    </tr>
  );
};

export { NoRecordRow };
