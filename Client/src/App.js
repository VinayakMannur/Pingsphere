import React from "react";
// routes
import Router from "./routes";
// theme
import ThemeProvider from "./theme";

import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { useDispatch, useSelector } from "react-redux";
import { closeSnackbar } from "./redux/slices/app";

const vertical = "top";
const horizontal = "right";

const Alert = React.forwardRef((props, ref) => {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function App() {
  const dispatch = useDispatch();

  const { open, severity, message } = useSelector(
    (state) => state.app.snackbar
  );

  return (
    <>
      <ThemeProvider>
        <Router />
      </ThemeProvider>

      {message && open ? (
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          autoHideDuration={4000}
          onClose={() => {
            dispatch(closeSnackbar());
          }}
        >
          <Alert
            severity={severity}
            onClose={() => {
              dispatch(closeSnackbar());
            }}
            sx={{ width: "100%" }}
          >
            {message}
          </Alert>
        </Snackbar>
      ) : (
        <></>
      )}
    </>
  );
}

export default App;
