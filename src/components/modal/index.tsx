import React from "react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { ModalActiveStatus } from "@/interfaces/modalActiveStatus";
import clsx from "clsx";

interface Props {
	modalActiveStatus: ModalActiveStatus;
}

const Modal: React.FC<Props> = ({ modalActiveStatus }) => {
	const config: { [key: string]: {} } = {
		title: {
			winOrLose: (
				<>
					<AlertDialog.Title className="AlertDialogTitle"></AlertDialog.Title>
					<AlertDialog.Description className="AlertDialogDescription">
						This action cannot be undone. This will permanently delete your account and remove your
						data from our servers.
					</AlertDialog.Description>
				</>
			),
			restart: <></>,
		},
	};

	return (
		<AlertDialog.Root
			defaultOpen={
				modalActiveStatus.lostActive ||
				modalActiveStatus.winActive ||
				modalActiveStatus.restartActive
			}
		>
			<AlertDialog.Portal>
				<AlertDialog.Overlay
					className={clsx(
						"ModalOverlay",
						`
              h-full w-full fixed
              bg-black opacity-50 mix-blend-blend
            `
					)}
				/>
				<AlertDialog.Content
					className={clsx(
						"ModalDialogContent",
						`
              h-[22.8rem] w-full
              bg-primary-bg-200
            `
					)}
				>
					{}
				</AlertDialog.Content>
			</AlertDialog.Portal>
		</AlertDialog.Root>
	);
};

export default Modal;
