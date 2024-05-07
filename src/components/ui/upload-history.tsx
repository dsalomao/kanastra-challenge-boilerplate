import { useContext, useEffect } from "react";
import { AppContext } from "@/components/contexts";
import {
	Table,
	TableHeader,
	TableBody,
	TableHead,
	TableRow,
	TableCell,
} from "@/components/ui";
import { useApi } from "../composables";

function UploadHistory() {
	const { state, dispatch } = useContext(AppContext);

	useEffect(() => {
		const fetchFileBatches = async () => {
			dispatch({ type: "SET_LOADING" });

			try {
				await useApi.get("/sanctum/csrf-cookie");

				const response = await useApi.get("/api/batches");

				dispatch({
					type: "SET_FILES",
					payload: response.data.data,
				});
			} catch (error) {
				dispatch({ type: "SET_ERROR", payload: error.message });
			}
		};

		fetchFileBatches();

		// Set up periodic polling
		const intervalId = setInterval(fetchFileBatches, 2500); // Poll every 2,5 seconds

		return () => clearInterval(intervalId); // Cleanup interval on component unmount
	}, [dispatch]);

	return (
		<div>
			<h2>Uploaded Files</h2>
			<Table className="table-auto">
				<TableHeader>
					<TableRow>
						<TableHead>ID</TableHead>
						<TableHead>Total de Linhas</TableHead>
						<TableHead>Linhas Pendentes</TableHead>
						<TableHead>Progresso</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{state.files.map((file, index) => {
						const progress =
							file.progress ||
							Math.abs(
								(100 * file.pending_jobs) / file.total_jobs -
									100
							).toFixed(2) + "%";

						return (
							<TableRow key={index}>
								<TableCell>{file.id}</TableCell>
								<TableCell>
									&#8773;{" "}
									{(file.totalJobs || file.total_jobs) * 1000}{" "}
									lines
								</TableCell>
								<TableCell>
									&#8773;{" "}
									{(file.pendingJobs || file.pending_jobs) *
										1000}{" "}
									lines
								</TableCell>
								<TableCell>
									<div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
										<div
											className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
											style={{ width: `${progress}%` }}
										>
											{" "}
											{progress}
										</div>
									</div>
								</TableCell>
							</TableRow>
						);
					})}
				</TableBody>
			</Table>
		</div>
	);
}

export { UploadHistory };
