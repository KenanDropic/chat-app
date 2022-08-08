import React from "react";
import { Form } from "../components";
import { PageWrapper } from "../styles/PageWrapper";
import { BgImage } from "../styles/BackgroundImage";
import { useAppSelector } from "../features/hooks/hooks";

const Authentication: React.FC = () => {
  const { status } = useAppSelector((state) => state.global);

  return (
    <PageWrapper>
      <Form status={status} />
      <BgImage />
    </PageWrapper>
  );
};

export default Authentication;
