import React, { FC } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { TableMeta } from './TableMeta';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import TableBody from '@mui/material/TableBody';
import LinearProgress from '@mui/material/LinearProgress';
import { linearProgressClasses, TableFooter } from '@mui/material';
import Box from '@mui/material/Box';
import { renderButtonBUY } from '../renderButtonBUY';
import { renderButtonSELL } from '../renderButtonSELL';
import { IToken } from '../../../../redux/interface/Setup/IToken';

export const Item = styled(Box)(({ theme, sx }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'auto',
  boxSizing: 'border-box',
  color: theme.palette.text.secondary,
  sx: {
    ...sx,
  },
}));

interface TableUiProps {
  tokens: any[];
  poolBalance: number;
  signals: any[];
  pool: any;
  itTrading: any;
  handlerDialogModal: (res: any) => void;
  handleOpenDialogToken: (it: IToken) => void;
}

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
  },
}));

const TableUi: FC<TableUiProps> = ({
                                     tokens = [],
                                     poolBalance,
                                     signals = [],
                                     itTrading = {},
                                     pool = {},
                                     handlerDialogModal,
                                     handleOpenDialogToken,
                                   }) => {
  const theme = useTheme();
  const categoryHandler = (category: { name: string }): string => {
    switch (category.name) {
      case 'Stable':
        return theme.palette.info.main;
      case 'Short':
        return theme.palette.error.light;
      case 'Long':
        return theme.palette.success.main;
      case 'Spot':
        return theme.palette.success.dark;
      default:
        return '';
    }
  };


  return (
    <TableContainer>
      <Table
        size={'small'}
        sx={{
          width: '100%',
          borderCollapse: 'separate',
          borderSpacing: '0px 0.25rem',
        }}>
        <TableHead>
          <TableRow>
            {TableMeta.map((it, idx) => (
              <TableCell
                sx={{
                  border: 'none',
                }}
                variant={'head'}
                key={idx}>
                <Typography fontSize={14} fontWeight={'bold'}>
                  {it.name}
                </Typography>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {tokens.map((it: IToken, index) => (
            <TableRow
              onClick={() => handleOpenDialogToken(it)}
              key={index}
              sx={{
                cursor: 'pointer',
                backgroundColor: theme.palette.action.focus,
              }}>
              <TableCell
                sx={{
                  border: 'none',
                  borderTopLeftRadius: '5px',
                  borderBottomLeftRadius: '5px',
                }}>
                <Typography
                  fontWeight={'bold'}
                  color={categoryHandler(it.category)}>
                  {it.symbol}
                </Typography>
              </TableCell>
              <TableCell
                sx={{
                  border: 'none',
                }}>
                {it.name}
              </TableCell>
              <TableCell
                sx={{
                  width: '520px',
                  border: 'none',
                }}>
                <Box
                  sx={{
                    fontWeight: 'bold',
                    fontSize: '15px',
                    width: '550px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <Box
                    sx={{
                      width: '450px',
                    }}>
                    <BorderLinearProgress
                      color={'inherit'}
                      variant="determinate"
                      value={+it.percentage}
                    />
                  </Box>
                  {it.percentage} %
                </Box>
              </TableCell>
              <TableCell
                sx={{
                  border: 'none',
                }}>
                {/*{it.dapp.name}*/}
              </TableCell>
              <TableCell
                sx={{
                  border: 'none',
                }}>
                {Number(it.amount).toFixed(4)}
              </TableCell>
              <TableCell
                sx={{
                  border: 'none',
                  borderTopRightRadius: '5px',
                  borderBottomRightRadius: '5px',
                }}>
                $ {Number(it.balance).toFixed(2)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell
              colSpan={6}
              align={'right'}
              sx={{
                border: 'none',
                borderRadius: '10px',
                paddingRight: '45px',
              }}>
              <Typography
                color={theme.palette.text.primary}
                fontSize={'25px'}
                fontWeight={'bold'}>
                $ <span>{poolBalance.toFixed(2).split('.', 2)[0]}</span>.
                <span
                  style={{
                    fontSize: '12px',
                  }}>
                  {poolBalance.toFixed(2).split('.', 2)[1]}
                </span>
              </Typography>
            </TableCell>
          </TableRow>
          {!pool?.automatic && (
            <TableRow>
              <TableCell
                sx={{
                  border: 'none',
                }}
                colSpan={6}>
                <Item sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ display: 'flex' }}>
                    {signals.map((it, index) => (
                      <Box key={index}>
                        {renderButtonBUY(
                          itTrading,
                          it,
                          it.id,
                          theme,
                          handlerDialogModal,
                        )}
                      </Box>
                    ))}
                  </Box>
                  <Box sx={{ display: 'flex' }}>
                    {signals.map((it, index) => (
                        <Box key={index}>{
                          renderButtonSELL(
                            itTrading,
                            it,
                            it.id,
                            theme,
                            handlerDialogModal,
                          )
                        }</Box>
                      ),
                    )}
                  </Box>
                </Item>
              </TableCell>
            </TableRow>
          )}
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default TableUi;
