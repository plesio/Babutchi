import { AppBar, Slide, Toolbar, Typography, useScrollTrigger } from "@mui/material";

interface HideOnScrollProps {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  children: React.ReactElement;
}

const HideOnScroll = (props: HideOnScrollProps) => {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
};

interface BabuTitleProps {
  children: string;
}

const BabuTitle = (props: BabuTitleProps) => {
  return (
    <HideOnScroll {...props}>
      <AppBar>
        <Typography variant="h1" component="div" fontSize="1.25rem" sx={{ p: "0.5rem", ml: "0.5rem" }}>
          {props.children}
        </Typography>
      </AppBar>
    </HideOnScroll>
  );
};

export default BabuTitle;
