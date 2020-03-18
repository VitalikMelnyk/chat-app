import React from "react";
import { Button, ButtonGroup, Box } from "@material-ui/core";
import { FormTitle } from "../GeneralComponents/FormTitle";
import { useStyles } from "../../styles";
import { useSelector, useDispatch } from "react-redux";
import { FormControlText } from "../FormFields";
import { setPaymentField } from "../../../../store/Registration/PaymentDetails/actions";
import { FormControlRadio } from "../FormFields/FormControlRadio";
import { useTranslation } from "react-i18next";

const PaymentDetails = ({
  formTitle,
  handleBackStep,
  handleResetCurrentStep,
  handleSubmit
}) => {
  const classes = useStyles();
  const { PaymentDetailsReducer } = useSelector(state => state);
  const {
    bankName,
    holderName,
    paymentType,
    cardNumber,
    cvcCode,
    errors
  } = PaymentDetailsReducer;
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const handleChangeField = name => event => {
    const value = event.target.value;
    const payload = { value, name };
    console.log(payload);
    dispatch(setPaymentField(payload));
  };
  return (
    <>
      <FormTitle formTitle={formTitle} />
      <form action="" onSubmit={handleSubmit} className={classes.DetailsForm}>
        <div className={classes.credentialFields}>
          <FormControlText
            errors={errors}
            idName="bankName"
            value={bankName}
            onChange={handleChangeField("bankName")}
            fullWidth={true}
            labelName={t("Bank Name")}
            type="text"
          />
          <FormControlText
            errors={errors}
            idName="holderName"
            value={holderName}
            onChange={handleChangeField("holderName")}
            fullWidth={true}
            labelName={t("Holder Name")}
            type="text"
          />
        </div>
        <div className={classes.formFields}>
          <FormControlRadio
            idName="paymentType"
            errors={errors}
            value={paymentType}
            onChange={handleChangeField("paymentType")}
          />
        </div>
        <div className={classes.credentialFields}>
          <FormControlText
            // maxLength={16}
            errors={errors}
            idName="cardNumber"
            value={cardNumber}
            onChange={handleChangeField("cardNumber")}
            fullWidth={true}
            labelName={t("Card Number")}
            type="password"
          />
          <FormControlText
            maxLength={4}
            errors={errors}
            idName="cvcCode"
            value={cvcCode}
            onChange={handleChangeField("cvcCode")}
            fullWidth={true}
            labelName={t("CVC")}
            type="password"
          />
        </div>
      </form>
      <ButtonGroup>
        <ButtonGroup>
          <Box mr={2}>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleResetCurrentStep}
            >
              {t("Reset")}
            </Button>
          </Box>
          <Button variant="contained" color="primary" onClick={handleBackStep}>
            {t("Back")}
          </Button>
        </ButtonGroup>

        <Button variant="contained" color="primary" onClick={handleSubmit}>
          {t("Submit")}
        </Button>
      </ButtonGroup>
    </>
  );
};

export default PaymentDetails;
