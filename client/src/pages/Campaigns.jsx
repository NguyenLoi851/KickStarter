import React, { useContext, useEffect } from "react";
import { useParams } from "react-router";
import { CampaignContext } from "../context/Campaign";
import { Loader } from "../components";
import {ethers} from 'ethers'

const Input = ({
  placeholder,
  name,
  type,
  minimumContribution,
  handleChangeContributeCampaign,
}) => (
  <input
    placeholder={placeholder}
    type={type}
    // value = {minimumContribution}
    className="outline"
    onChange={(e) => handleChangeContributeCampaign(e, name)}
  />
);

const Campaigns = () => {
  const {
    detailCampaign,
    setContractAddress,
    getDetailInfo,
    contractAddress,
    handleChangeContributeCampaign,
    isLoadingContributeCampaign,
    formContributeCampaign,
    contributeCampaign
  } = useContext(CampaignContext);
  const { id } = useParams();
  const address = id;
  useEffect(() => {
    setContractAddress(address);
  }, [address]);

  const handleSubmitContributeCampaign = (e) => {
    const { contribution } = formContributeCampaign;
    e.preventDefault();
    if (!contribution) return;
    contributeCampaign();
  };

  return (
    <div>
      <div>Campaigns Detail</div>
      <div>
        <div>Campaign Balance: {detailCampaign.balance}</div>
        <div>
          Minimum Contribution: {detailCampaign.minimumContribution} (ether)
        </div>
        <div>Pending Requests: {detailCampaign.numRequests}</div>
        <div>Contributors: {detailCampaign.approversCount}</div>
      </div>

      <div>
        Contribute to this campaign!
        <br />
        <Input
          type="text"
          name="contribution"
          placeholder="Contribution (wei)"
          handleChangeContributeCampaign={handleChangeContributeCampaign}
        />
      </div>
      {isLoadingContributeCampaign ? (
        <Loader />
      ) : (
        <button
          type="button"
          onClick={handleSubmitContributeCampaign}
          className="flex flex-row justify-center items-center my-5 bg-[#29f2e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]"
        >
          Contribute
        </button>
      )}
    </div>
  );
};

export default Campaigns;