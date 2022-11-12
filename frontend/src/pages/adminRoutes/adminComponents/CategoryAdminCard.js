import React from 'react'

export default function CategoryAdminCard(props) {
  return (
    <div key={props.category._id} className="row text-center mb-2 ">
                <div className="col-4">
                  <h5>{props.category.name}</h5>
                </div>
                <div className="col-4">
                  <button
                    className="btn btn-success m-2"
                    onClick={() => {
                      props.getCategoryById(props.category._id);
                      props.setCategoryID(props.category._id);
                      props.setShowModal(true);
                    }}
                  >
                    Update
                  </button>
                </div>
                <div className="col-4">
                  <button
                    onClick={() => {
                         props.deleteCategory(props.category._id);
                    }}
                    className="btn btn-danger m-2"
                  >
                    Delete
                  </button>
                </div>
              </div>
  )
}
