// OverviewModal component displays a modal with a visual grid (work in progress).
import { GradientGrid } from "./gradient-grid";

export const OverviewModal = () => {
  return (
    <>
      {/* Button to open the modal */}
      <button
        className="btn btn-outline-info"
        data-bs-toggle="modal"
        data-bs-target="#overviewModal"
      >
        Goal Overview (WIP)
      </button>
      {/* Modal structure using Bootstrap classes */}
      <div
        className="modal fade"
        id="overviewModal"
        tabIndex="-1"
        aria-labelledby="overviewModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="overviewModalLabel">
                Goal Overview (WIP)
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {/* Visual grid inside the modal */}
              <GradientGrid />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
