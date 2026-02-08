import React from "react";
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  StepConnector,
  stepConnectorClasses,
  styled,
  useTheme,
} from "@mui/material";
import {
  CircleCheckIcon,
  ErrorIcon,
  RadioButtonIcon,
} from "../icons/IconComponents";
import { FormStep } from "~/store/slices/productSlice";

/* -------------------------------------------------------------------------- */
/*                                   CONFIG                                   */
/* -------------------------------------------------------------------------- */

const ICON_SIZE = 24;

/* -------------------------------------------------------------------------- */
/*                                   TYPES                                    */
/* -------------------------------------------------------------------------- */

interface FormStepsProps {
  currentStep: FormStep;
  stepValidationErrors: Partial<Record<FormStep, boolean>>;
  onStepClick?: (step: FormStep) => void;
}

interface CustomStepIconProps {
  active?: boolean;
  completed?: boolean;
  visited?: boolean;
  hasError?: boolean;
}

/* -------------------------------------------------------------------------- */
/*                                CONNECTOR                                   */
/* -------------------------------------------------------------------------- */

const Connector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: ICON_SIZE / 2,
    left:
      theme.direction === "rtl"
        ? `calc(50% + ${ICON_SIZE / 2}px)`
        : `calc(-50% + ${ICON_SIZE / 2}px)`,
    right:
      theme.direction === "rtl"
        ? `calc(-50% + ${ICON_SIZE / 2}px)`
        : `calc(50% + ${ICON_SIZE / 2}px)`,
  },

  [`& .${stepConnectorClasses.line}`]: {
    borderTopWidth: 2,
    borderRadius: 1,
    borderColor: theme.palette.divider,
  },

  [`&.${stepConnectorClasses.active} .${stepConnectorClasses.line}`]: {
    borderColor: theme.palette.primary.main,
  },

  [`&.${stepConnectorClasses.completed} .${stepConnectorClasses.line}`]: {
    borderColor: theme.palette.success.main,
  },
}));

/* -------------------------------------------------------------------------- */
/*                               STEP ICON                                    */
/* -------------------------------------------------------------------------- */

const StepIconRoot = styled("div")<{
  ownerState: CustomStepIconProps;
}>(({ theme, ownerState }) => {
  let color = theme.palette.grey[400];

  if (ownerState.completed && !ownerState.hasError) {
    color = theme.palette.success.main;
  } else if (ownerState.visited && ownerState.hasError) {
    color = theme.palette.error.main;
  } else if (ownerState.active) {
    color = theme.palette.primary.main;
  }

  return {
    width: ICON_SIZE,
    height: ICON_SIZE,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.palette.background.paper,
    color,
    zIndex: 2,
  };
});

const CustomStepIcon: React.FC<CustomStepIconProps> = ({
  active,
  completed,
  visited,
  hasError,
}) => {
  let IconComponent = RadioButtonIcon;

  if (completed && !hasError) IconComponent = CircleCheckIcon;
  else if (visited && hasError) IconComponent = ErrorIcon;

  return (
    <StepIconRoot ownerState={{ active, completed, visited, hasError }}>
      <IconComponent size={"small"} />
    </StepIconRoot>
  );
};

/* -------------------------------------------------------------------------- */
/*                               MAIN COMPONENT                               */
/* -------------------------------------------------------------------------- */

const FormSteps: React.FC<FormStepsProps> = ({
  currentStep,
  stepValidationErrors,
  onStepClick,
}) => {
  const theme = useTheme();

  const steps = [
    { key: FormStep.CATEGORY_SELECTION, label: "انتخاب دسته‌بندی" },
    { key: FormStep.DETAILS_SELECTION, label: "انتخاب قالب‌های اطلاعات" },
    { key: FormStep.DETAILS_FORM, label: "تکمیل فرم‌های اطلاعات" },
    { key: FormStep.ATTRIBUTES_SELECTION, label: "انتخاب قالب‌های ویژگی" },
    { key: FormStep.ATTRIBUTES_FORM, label: "تکمیل فرم‌های ویژگی" },
    { key: FormStep.IMAGE_SELECTION, label: "انتخاب تصاویر" },
    { key: FormStep.PRODUCT_INFO, label: "اطلاعات محصول" },
  ];

  const activeIndex = steps.findIndex((step) => step.key === currentStep);

  return (
    <Box sx={{ width: "100%", mb: 4, direction: "rtl", overflowX: "auto" }}>
      <Stepper
        alternativeLabel
        activeStep={activeIndex}
        connector={<Connector />}
        sx={{
          minWidth: { xs: "max-content", md: "100%" },
          px: { xs: 1, sm: 2 },
        }}
      >
        {steps.map((step, index) => {
          const active = index === activeIndex;
          const completed = index < activeIndex;
          const visited = index < activeIndex;
          const hasError = !!stepValidationErrors[step.key];

          return (
            <Step key={String(step.key)} completed={completed}>
              <StepLabel
                StepIconComponent={() => (
                  <CustomStepIcon
                    active={active}
                    completed={completed}
                    visited={visited}
                    hasError={hasError}
                  />
                )}
                onClick={() => onStepClick?.(step.key)}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  cursor: onStepClick ? "pointer" : "default",
                  "& .MuiStepLabel-labelContainer": {
                    width: "100%",
                  },
                  "& .MuiStepLabel-label": {
                    mt: 1,
                    textAlign: "center",
                    fontSize: { xs: "0.7rem", sm: "0.8rem" },
                    lineHeight: 1.3,
                    maxWidth: 110,
                    mx: "auto",
                    whiteSpace: "normal",
                    color:
                      visited && hasError
                        ? theme.palette.error.main
                        : active
                          ? theme.palette.primary.main
                          : completed
                            ? theme.palette.success.main
                            : theme.palette.text.secondary,
                  },
                  "&:hover": onStepClick ? {
                    "& .MuiStepLabel-label": {
                      color: theme.palette.primary.main,
                    },
                  } : {},
                }}
              >
                {step.label}
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </Box>
  );
};

export default FormSteps;
