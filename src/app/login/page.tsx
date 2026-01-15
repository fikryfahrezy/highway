"use client";

import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Box,
  Button,
  TextField,
  Typography,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useLogin } from "@/services/use-highway-service";
import { useAuth } from "@/contexts/auth-context";

const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const { login, token, isLoading: authLoading } = useAuth();
  const loginMutation = useLogin();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    loginMutation.mutate(data, {
      onSuccess: (data) => {
        if (data.token) {
          login(data.token);
          router.replace("/");
        }
      },
    });
  };

  if (authLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (token) {
    return router.replace("/");
  }

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          px: 4,
          bgcolor: "background.paper",
        }}
      >
        <Box sx={{ width: "100%", maxWidth: 400 }}>
          <Box
            sx={{
              width: "100%",
              height: 150,
              border: "1px solid",
              borderColor: "grey.400",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mb: 4,
              position: "relative",
              "&::before, &::after": {
                content: '""',
                position: "absolute",
                backgroundColor: "grey.400",
              },
              "&::before": {
                width: "100%",
                height: "1px",
                transform: "rotate(20deg)",
              },
              "&::after": {
                width: "100%",
                height: "1px",
                transform: "rotate(-20deg)",
              },
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontStyle: "italic",
                color: "grey.600",
                zIndex: 1,
                bgcolor: "background.paper",
                px: 1,
              }}
            >
              App Logo
            </Typography>
          </Box>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ mb: 3 }}>
              <Typography
                component="label"
                htmlFor="username"
                sx={{ display: "block", mb: 1, color: "text.primary" }}
              >
                Username
              </Typography>
              <Controller
                name="username"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="username"
                    fullWidth
                    size="small"
                    error={!!errors.username}
                    helperText={errors.username?.message}
                    autoComplete="username"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        bgcolor: "grey.100",
                      },
                    }}
                  />
                )}
              />
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography
                component="label"
                htmlFor="password"
                sx={{ display: "block", mb: 1, color: "text.primary" }}
              >
                Password
              </Typography>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="password"
                    type="password"
                    fullWidth
                    size="small"
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    autoComplete="current-password"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        bgcolor: "grey.100",
                      },
                    }}
                  />
                )}
              />
            </Box>

            {loginMutation.isError && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {loginMutation.error.message}
              </Alert>
            )}

            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                type="submit"
                variant="contained"
                disabled={loginMutation.isPending}
                sx={{
                  bgcolor: "grey.800",
                  color: "white",
                  px: 4,
                  "&:hover": {
                    bgcolor: "grey.900",
                  },
                }}
              >
                {loginMutation.isPending ? "Signing in..." : "Login"}
              </Button>
            </Box>
          </form>
        </Box>
      </Box>

      <Box
        sx={{
          flex: 1,
          bgcolor: "#e8eaed",
          display: { xs: "none", md: "flex" },
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          border: "1px solid",
          borderColor: "grey.400",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            width: "100%",
            height: "100%",
            "&::before, &::after": {
              content: '""',
              position: "absolute",
              backgroundColor: "grey.500",
              width: "141%",
              height: "1px",
              top: "50%",
              left: "-20%",
            },
            "&::before": {
              transform: "rotate(45deg)",
            },
            "&::after": {
              transform: "rotate(-45deg)",
            },
          }}
        />
        <Typography
          variant="h5"
          sx={{
            fontWeight: 500,
            color: "grey.700",
            zIndex: 1,
            bgcolor: "#e8eaed",
            px: 2,
          }}
        >
          App Illustration/Background
        </Typography>
      </Box>
    </Box>
  );
}
