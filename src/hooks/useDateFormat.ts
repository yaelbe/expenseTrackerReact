const useDateFormat = () => {
  const formatDate = (date: Date) => {
    if (!date) return '';
    const formatted = date.toISOString().split('T')[0];
    return formatted;
  };

  return {formatDate};
};

export default useDateFormat;
