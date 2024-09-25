import Skeleton from "@mui/material/Skeleton";

import * as S from "./styles";
import { REGISTRATION_STATUS } from "../../constants";
import { Box } from "@mui/material";

const allColumns = [
  { status: REGISTRATION_STATUS.REVIEW, title: "Pronto para revisar" },
  { status: REGISTRATION_STATUS.APPROVED, title: "Aprovado" },
  { status: REGISTRATION_STATUS.REPROVED, title: "Reprovado" },
];

const CollumnsLoading = () => {
  return (
    <S.Container data-testid="collumns-loading-state">
      {allColumns.map((collum) => {
        return (
          <S.Column status={collum.status} key={collum.title}>
            <>
              <S.TitleColumn status={collum.status}>
                {collum.title}
              </S.TitleColumn>
              <S.CollumContent>
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  mx={3}
                  gap={3}
                >
                  <Skeleton variant="rounded" width="100%" height={120} />
                  <Skeleton variant="rounded" width="100%" height={120} />
                </Box>
              </S.CollumContent>
            </>
          </S.Column>
        );
      })}
    </S.Container>
  );
};
export default CollumnsLoading;
