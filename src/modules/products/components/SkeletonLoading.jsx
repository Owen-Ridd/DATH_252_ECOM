import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonLoading = () => {
  return (
    <>
      <div className="col-12 py-5 text-center">
          <Skeleton height={20} width={200} />
      </div>
      {Array(6).fill().map((_, index) => (
          <div className="col-lg-4 col-md-6 mb-5" key={index}>
              <Skeleton height={380} />
              <Skeleton height={30} width="60%" className="mt-3" />
              <Skeleton height={20} width="30%" />
          </div>
      ))}
    </>
  );
};

export default SkeletonLoading;