import React from "react";
import { useTranslation } from "react-i18next";
import { Formik, Form } from "formik";
import { Dialog, DialogTitle, DialogContent, Button } from "@material-ui/core";
import { FormControlText } from "../../GeneralComponents/FormFields";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  roomDialog: {
    textAlign: "center",
  },
  roomBtn: {
    margin: "15px 0",
  },
}));

const CreateRoom = ({ open, setOpen, handleClose, sendRoomName }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  return (
    <div>
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="room-dialog"
          className={classes.roomDialog}
        >
          <DialogTitle id="room-dialog">Enter the room name!</DialogTitle>
          <DialogContent>
            <Formik
              initialValues={{
                room: "",
              }}
              onSubmit={({ room }, actions) => {
                sendRoomName(room);
                setOpen(false);
              }}
            >
              {({
                errors,
                isValid,
                touched,
                handleSubmit,
                dirty,
                values,
                handleChange,
                handleBlur,
              }) => (
                <Form>
                  <FormControlText
                    name="room"
                    id="room"
                    label="Name"
                    type="text"
                    required={false}
                    value={values.room}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    helperText={touched.room ? errors.room : ""}
                    error={touched.room && Boolean(errors.room)}
                  />

                  <Button
                    className={classes.roomBtn}
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    disabled={!isValid || !dirty}
                  >
                    {t("Submit")}
                  </Button>
                </Form>
              )}
            </Formik>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default CreateRoom;
