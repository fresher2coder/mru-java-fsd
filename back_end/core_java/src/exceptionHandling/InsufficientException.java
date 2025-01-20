package exceptionHandling;

class InsufficientException extends Exception{
	
	private static final long serialVersionUID = 1L;

	public InsufficientException() {
		super();
	}

	public InsufficientException(String message) {
		super(message);
	}	
}