import { AppProvider } from "@/components/contexts";
import { FileUploader } from "@/components";
import { UploadHistory } from "@/components";

function Layout() {
	return (
		<>
			<main className="container mx-auto my-5 py-5">
				<h2 className="w-full flex-none text-lg font-medium text-slate-700 mb-4">
					Welcome to this awesome CSV uploader!
				</h2>
				<AppProvider>
					<div>
						<FileUploader />
						<UploadHistory />
					</div>
				</AppProvider>
			</main>
		</>
	);
}

export { Layout };
