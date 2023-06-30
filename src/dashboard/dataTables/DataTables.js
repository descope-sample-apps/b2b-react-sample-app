import { Box, SimpleGrid, useColorMode } from "@chakra-ui/react";
import React, { useState } from "react";
import DevelopmentTables from "./component/DevelopmentTables";
import {
  columnsDataDevelopment,
  columnsDataCheck,
  columnsDataColumns,
  columnsDataComplex,
} from "../../dashboard/dataTables/variables/DataColumns";
import "./dataTables.scss";
import CheckTable from "./component/CheckTable";
import ColumnsTable from "./component/ColumnsTable";
import ComplexTable from "./component/ComplexTable";
import AdminExperiences from "../../components/adminExperiences/AdminExperiences";
import { getSessionToken, Descope } from '@descope/react-sdk';

// export default DataTables;
export default function DataTables() {
	const [data, setData] = useState({
		check: [],
		columns: [],
		development: [],
		complex: [],
		loaded: false,
	});
	const { colorMode } = useColorMode();

	const [authenticationFlow, setAuthenticationFlow] = useState(false);
	const projectId = localStorage.getItem('projectId') || process.env.REACT_APP_DESCOPE_PROJECT_ID;
	const sessionToken = getSessionToken();

	if (!data.loaded) {
		fetch("/api/data", {
			method: "get",
			headers: {
				Accept: "application/json, text/plain, */*",
				"Content-Type": "application/json",
				"x-project-id": projectId,
				Authorization: `Bearer ${sessionToken}`,
			},
		})
		.then((response) => {
			if (response.status === 401) {
				setAuthenticationFlow(true);
			}  else {
				setAuthenticationFlow(false);
				return  response.json();
			}
		})
		.then((res) => {
			if (res) {
				res.body.loaded = true;
				setData(res.body);
				setAuthenticationFlow(false);
			}
		})
		.catch((err) => console.log('err => ', err));
	}

	return (
		<Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
			<SimpleGrid
				mb="20px"
				columns={authenticationFlow ? { sm: 1, md: 1 }: { sm: 1, md: 2 }}
				spacing={{ base: "20px", xl: "20px" }}
			>
        { authenticationFlow &&
            (
              <Box margin={'auto'} width='50%'>
                <Descope
                flowId="step-up"
                onSuccess={(e) => {
                  console.log('success => ', e)
                }}
                onError={(e) => console.log("Error!")}
                theme={ colorMode }
                />
              </Box>
            )
        }
				{
					<>
						<DevelopmentTables
							columnsData={columnsDataDevelopment}
							tableData={data.development}
						/>
						<CheckTable columnsData={columnsDataCheck} tableData={data.check} />
						<ColumnsTable
							columnsData={columnsDataColumns}
							tableData={data.columns}
						/>
						<ComplexTable
							columnsData={columnsDataComplex}
							tableData={data.complex}
						/>
					</>
				}
			</SimpleGrid>
			<Box display={'flex'} justifyContent={'center'}>
					<AdminExperiences/>
			</Box>
		</Box>
	);
}