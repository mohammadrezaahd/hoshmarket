import { Box, Card, Container, Grid, Typography } from "@mui/material";

const TeamSection = () => {
  const team = [
    {
      name: "سارا احمدی",
      role: "مدیرعامل",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDJoW-54UVofqVZedbmqO36VhPdpTA2A2bVsk84CDMSnPNmOHpgZ3oLSyYpAzqI35n2UcJAEmsjVSxVRnGklhB_frqh9aDEQqizxLabSdG8BP5j2w1wvktlAb_PMboemx8bg5HMNJT6corSPTzGEnMr0bxrmtl3AV8j8FivXwWgwXp_yJGTY7N1InrT-6z1diYLbbqcwv4iHSShgmASMX-k0LiYpkuOjb91AKRlR2tgej9-BI_fX6Nnwpb8z9ZF-Fh9SozQLS1YpKM",
    },
    {
      name: "امیر صادقی",
      role: "مدیر فنی",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuC0_OvM2nnlm8B9U2D5OdLYAwpSCfAgGB9lFFWyslePKSsN1RqKHIKBOuw8grC3uqpXhgEKmmseawpeIoecIKkvZ1ha9LZ8dO5oBaqAvB10o3rUY6XXWbmGPoH4FmMuXog3uR7wwDn09U1ue6pLskf1oki6n1QJnf-NhUJBrjJzE7bmK2MdljVcPF9bg6YmViR_m9UJYmxp9i3TxmvwvV6V5nLCtlHMCL9GlwhRU1MWEWwZSOMEUXwWlL6-QtYa99StYvUa-K4eTaQ",
    },
    {
      name: "مریم حسینی",
      role: "مدیر هوش مصنوعی",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAuLJuj9FS657X7fUWOJvm1JbHittGRkjZHqbvJHd5mAwZS5OLIT4l8WlSf_dT8iRLC0j5r9958-pcpNPdK6rTeeyH8GHCfQAZdrPAUmmtBW_cy26rP3EWckPstXQih4gmOA-4ur9kQuPOb6g0veNRi9_I26HvxMvFcYRaHj2QCv5HjlRpNAF83PmJL7WmrXBOXs5jmEE0nX-P2sCeyVrJXsYH5sKu-kOEjT35cK39Bon5BRshxJ5gGiCgmIvx9aLQODhMYUkhL400",
    },
    {
      name: "علی رضایی",
      role: "مدیر محصول",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuB1klvMzY6sXw2pqglGilCW9d4VgcQ_nLsJ_ZDI5ja4ry78WlSyqM29R8MmfxljGdxLQlIz-KPU_zgqaVDiA7ki8jEy3gSBhBi4U2hevY0JN8CSvO8E0Qy2SydsrTDqtt-HI90l2Z9buFUT_K8iGkoJbEDmp0BWEF2Uw6kLn3sgc9iGmXZxjnKTweVoSvjGS4gMWYwXzjNhnM607QqviShIGNlrIp3f4BFJQa7cNGHUJvbKq8GpxSE2FwkI-PXSnQn6-3fkQNky7PU",
    },
  ];

  return (
    <Box sx={{ py: 12 }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 6 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              fontSize: "1.875rem",
              mb: 1,
              color: "#1e293b",
            }}
          >
            تیم ما
          </Typography>
          <Typography
            sx={{
              color: "#64748b",
              fontSize: "1.125rem",
            }}
          >
            با ذهن‌هایی که انقلاب هوش مصنوعی را رهبری می‌کنند، آشنا شوید.
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {team.map((member, index) => (
            <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={index}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    "& .team-image": {
                      filter: "grayscale(0%)",
                    },
                  },
                }}
              >
                <Card
                  sx={{
                    border: "1px solid #e2e8f0",
                    borderRadius: 2,
                    overflow: "hidden",
                    boxShadow: 1,
                    transition: "box-shadow 0.3s ease",
                    "&:hover": {
                      boxShadow: 2,
                    },
                  }}
                >
                  <Box
                    className="team-image"
                    sx={{
                      aspectRatio: "3/4",
                      backgroundImage: `url('${member.image}')`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      filter: "grayscale(100%)",
                      transition: "filter 0.5s ease",
                    }}
                  />
                </Card>
                <Box sx={{ px: 1 }}>
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      fontSize: "1.125rem",
                      color: "#1e293b",
                    }}
                  >
                    {member.name}
                  </Typography>
                  <Typography
                    sx={{
                      color: "#1337ec",
                      fontWeight: 500,
                      fontSize: "0.875rem",
                    }}
                  >
                    {member.role}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default TeamSection;
