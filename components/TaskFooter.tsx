interface TaskFooterProps {
  total: number;
  filtered: number;
}

export const TaskFooter = ({ total, filtered }: TaskFooterProps) => (
  <footer className="mt-8 pt-4 border-t text-sm text-gray-600 flex justify-between">
    <p>Total tasks: {total}</p>
    <p>Showing: {filtered}</p>
  </footer>
);